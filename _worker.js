
// 部署完成后在网址后面加上这个，获取自建节点和机场聚合节点，/?token=auto或/auto或

let mytoken = 'auto'; //可以随便取，或者uuid生成，https://1024tools.com/uuid
let BotToken =''; //可以为空，或者@BotFather中输入/start，/newbot，并关注机器人
let ChatID =''; //可以为空，或者@userinfobot中获取，/start
let TG = 0; //小白勿动， 开发者专用，1 为推送所有的访问信息，0 为不推送订阅转换后端的访问信息与异常访问
let FileName = 'CF-Workers-SUB';
let SUBUpdateTime = 6; //自定义订阅更新时间，单位小时
let total = 99;//TB
let timestamp = 4102329600000;//2099-12-31

let cacheTTL = 24 ;//小时，缓存时长

//节点链接 + 订阅链接
let MainData = `
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjA4MDEiLA0KICAiYWRkIjogIjEwNy4xNzIuOTQuMTQiLA0KICAicG9ydCI6ICIzNjA4NyIsDQogICJpZCI6ICI5Y2JmMTczMi0zNzUwLTRmZGItYTU4Mi1jMTM5OGM3MTFlNDEiLA0KICAiYWlkIjogIjAiLA0KICAic2N5IjogImF1dG8iLA0KICAibmV0IjogIndzIiwNCiAgInR5cGUiOiAibm9uZSIsDQogICJob3N0IjogIiIsDQogICJwYXRoIjogIi85Y2JmMTczMiIsDQogICJ0bHMiOiAiIiwNCiAgInNuaSI6ICIiLA0KICAiYWxwbiI6ICIiLA0KICAiZnAiOiAiIg0KfQ==
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjEyNC1cdTY3MkFcdTc3RTVfMDgxODEzMDc0IiwNCiAgImFkZCI6ICJqYXBhbi5jb20iLA0KICAicG9ydCI6ICIyMDg2IiwNCiAgImlkIjogImU5ZTNjYzEzLWRiNDgtNGNjMS04YzI0LTc2MjY0MzlhNTMzOSIsDQogICJhaWQiOiAiMCIsDQogICJzY3kiOiAiYXV0byIsDQogICJuZXQiOiAid3MiLA0KICAidHlwZSI6ICJhdXRvIiwNCiAgImhvc3QiOiAiaXAxLjE3ODkwMzQueHl6IiwNCiAgInBhdGgiOiAiZ2l0aHViLmNvbS9BbHZpbjk5OTkiLA0KICAidGxzIjogIiIsDQogICJzbmkiOiAiaXAxLjE3ODkwMzQueHl6IiwNCiAgImFscG4iOiAiaDMsaDIiLA0KICAiZnAiOiAiYW5kcm9pZCINCn0=
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjA4MDEiLA0KICAiYWRkIjogIjEwNy4xNzIuOTQuMTQiLA0KICAicG9ydCI6ICIzNjA4NyIsDQogICJpZCI6ICI5Y2JmMTczMi0zNzUwLTRmZGItYTU4Mi1jMTM5OGM3MTFlNDEiLA0KICAiYWlkIjogIjAiLA0KICAic2N5IjogImF1dG8iLA0KICAibmV0IjogIndzIiwNCiAgInR5cGUiOiAibm9uZSIsDQogICJob3N0IjogIiIsDQogICJwYXRoIjogIi85Y2JmMTczMiIsDQogICJ0bHMiOiAiIiwNCiAgInNuaSI6ICIiLA0KICAiYWxwbiI6ICIiLA0KICAiZnAiOiAiIg0KfQ==
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjEyOS1cdTY3MkFcdTc3RTVfMDgwMjA0MDI3IiwNCiAgImFkZCI6ICIxMDQuMjYuNy4xMzIiLA0KICAicG9ydCI6ICIyMDg2IiwNCiAgImlkIjogImU5ZTNjYzEzLWRiNDgtNGNjMS04YzI0LTc2MjY0MzlhNTMzOSIsDQogICJhaWQiOiAiMCIsDQogICJzY3kiOiAiYXV0byIsDQogICJuZXQiOiAid3MiLA0KICAidHlwZSI6ICJhdXRvIiwNCiAgImhvc3QiOiAiaXAyLjE0NTcyMzAueHl6IiwNCiAgInBhdGgiOiAiZ2l0aHViLmNvbS9BbHZpbjk5OTkiLA0KICAidGxzIjogIiIsDQogICJzbmkiOiAiaXAyLjE0NTcyMzAueHl6IiwNCiAgImFscG4iOiAiaDMsaDIsaHR0cC8xLjEiLA0KICAiZnAiOiAiYW5kcm9pZCINCn0=
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjEzNi0xM2siLA0KICAiYWRkIjogImZiaS5nb3YiLA0KICAicG9ydCI6ICIyMDg2IiwNCiAgImlkIjogImU5ZTNjYzEzLWRiNDgtNGNjMS04YzI0LTc2MjY0MzlhNTMzOSIsDQogICJhaWQiOiAiMCIsDQogICJzY3kiOiAiYXV0byIsDQogICJuZXQiOiAid3MiLA0KICAidHlwZSI6ICJhdXRvIiwNCiAgImhvc3QiOiAiaXAxMy5mcmVlZ3JhZGVseS54eXoiLA0KICAicGF0aCI6ICJnaXRodWIuY29tL0FsdmluOTk5OSIsDQogICJ0bHMiOiAiIiwNCiAgInNuaSI6ICJpcDEzLmZyZWVncmFkZWx5Lnh5eiIsDQogICJhbHBuIjogImgzLGgyLGh0dHAvMS4xIiwNCiAgImZwIjogImNocm9tZSINCn0=
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjE0MC1cdTUyQTBcdTYyRkZcdTU5MjdfMDgxODEzMDA2IiwNCiAgImFkZCI6ICIyMy4yMjcuMzguNSIsDQogICJwb3J0IjogIjIwODYiLA0KICAiaWQiOiAiMjllZWJiNjAtYjI3Yi00YTlkLWJiYTUtOTQ3NzYzZDkyMDVlIiwNCiAgImFpZCI6ICIwIiwNCiAgInNjeSI6ICJhdXRvIiwNCiAgIm5ldCI6ICJ3cyIsDQogICJ0eXBlIjogIm5vbmUiLA0KICAiaG9zdCI6ICJpcDAwNi5mcmVlZ3JhZGVseS54eXoiLA0KICAicGF0aCI6ICJnaXRodWIuY29tL0FsdmluOTk5OSIsDQogICJ0bHMiOiAiIiwNCiAgInNuaSI6ICJpcDAwNi5mcmVlZ3JhZGVseS54eXoiLA0KICAiYWxwbiI6ICJodHRwLzEuMSIsDQogICJmcCI6ICJpb3MiDQp9
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjEzOS1cdTY3MkFcdTc3RTVfOGsiLA0KICAiYWRkIjogIjEwNC4yNi41LjExMiIsDQogICJwb3J0IjogIjIwODYiLA0KICAiaWQiOiAiZTllM2NjMTMtZGI0OC00Y2MxLThjMjQtNzYyNjQzOWE1MzM5IiwNCiAgImFpZCI6ICIwIiwNCiAgInNjeSI6ICJhdXRvIiwNCiAgIm5ldCI6ICJ3cyIsDQogICJ0eXBlIjogIm5vbmUiLA0KICAiaG9zdCI6ICJpcDEuMTc4OTAzNC54eXoiLA0KICAicGF0aCI6ICJnaXRodWIuY29tL0FsdmluOTk5OSIsDQogICJ0bHMiOiAiIiwNCiAgInNuaSI6ICJpcDEuMTc4OTAzNC54eXoiLA0KICAiYWxwbiI6ICIiLA0KICAiZnAiOiAiIg0KfQ==
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjE5MC1cdUQ4M0NcdURERkFcdUQ4M0NcdURERjggXHU3RjhFXHU1NkZEIENsb3VkRmxhcmVcdTgyODJcdTcwQjkiLA0KICAiYWRkIjogIjE3Mi42NC4yMzMuNDMiLA0KICAicG9ydCI6ICIyMDg2IiwNCiAgImlkIjogImU5ZTNjYzEzLWRiNDgtNGNjMS04YzI0LTc2MjY0MzlhNTMzOSIsDQogICJhaWQiOiAiMCIsDQogICJzY3kiOiAiYXV0byIsDQogICJuZXQiOiAid3MiLA0KICAidHlwZSI6ICJub25lIiwNCiAgImhvc3QiOiAiaXAyLjE0NTcyMzAueHl6IiwNCiAgInBhdGgiOiAiZ2l0aHViLmNvbS9BbHZpbjk5OTkiLA0KICAidGxzIjogIiIsDQogICJzbmkiOiAiaXAyLjE0NTcyMzAueHl6IiwNCiAgImFscG4iOiAiaDMsaDIsaHR0cC8xLjEiLA0KICAiZnAiOiAiZWRnZSINCn0=
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjA4MDEiLA0KICAiYWRkIjogIjEwNy4xNzIuOTQuMTQiLA0KICAicG9ydCI6ICIzNjA4NyIsDQogICJpZCI6ICI5Y2JmMTczMi0zNzUwLTRmZGItYTU4Mi1jMTM5OGM3MTFlNDEiLA0KICAiYWlkIjogIjAiLA0KICAic2N5IjogImF1dG8iLA0KICAibmV0IjogIndzIiwNCiAgInR5cGUiOiAibm9uZSIsDQogICJob3N0IjogIiIsDQogICJwYXRoIjogIi85Y2JmMTczMiIsDQogICJ0bHMiOiAiIiwNCiAgInNuaSI6ICIiLA0KICAiYWxwbiI6ICIiLA0KICAiZnAiOiAiIg0KfQ==
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjE5MC1cdUQ4M0NcdURERkFcdUQ4M0NcdURERjggXHU3RjhFXHU1NkZEIENsb3VkRmxhcmVcdTgyODJcdTcwQjktMjVrIiwNCiAgImFkZCI6ICIxNzIuNjQuMjMzLjQzIiwNCiAgInBvcnQiOiAiMjA4NiIsDQogICJpZCI6ICJlOWUzY2MxMy1kYjQ4LTRjYzEtOGMyNC03NjI2NDM5YTUzMzkiLA0KICAiYWlkIjogIjAiLA0KICAic2N5IjogImF1dG8iLA0KICAibmV0IjogIndzIiwNCiAgInR5cGUiOiAibm9uZSIsDQogICJob3N0IjogImlwMi4xNDU3MjMwLnh5eiIsDQogICJwYXRoIjogImdpdGh1Yi5jb20vQWx2aW45OTk5IiwNCiAgInRscyI6ICIiLA0KICAic25pIjogImlwMi4xNDU3MjMwLnh5eiIsDQogICJhbHBuIjogIiIsDQogICJmcCI6ICIiDQp9
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjEyNS1cdTY3MkFcdTc3RTVfMDgxODEzMDkzIiwNCiAgImFkZCI6ICIxMDQuMTkuNTUuNDkiLA0KICAicG9ydCI6ICIyMDg2IiwNCiAgImlkIjogImU5ZTNjYzEzLWRiNDgtNGNjMS04YzI0LTc2MjY0MzlhNTMzOSIsDQogICJhaWQiOiAiMCIsDQogICJzY3kiOiAiYXV0byIsDQogICJuZXQiOiAid3MiLA0KICAidHlwZSI6ICJhdXRvIiwNCiAgImhvc3QiOiAiaXAyLjE0NTcyMzAueHl6IiwNCiAgInBhdGgiOiAiZ2l0aHViLmNvbS9BbHZpbjk5OTkiLA0KICAidGxzIjogIiIsDQogICJzbmkiOiAiaXAyLjE0NTcyMzAueHl6IiwNCiAgImFscG4iOiAiaDMsaDIsaHR0cC8xLjEiLA0KICAiZnAiOiAicmFuZG9taXplZCINCn0=
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjE5MC1cdUQ4M0NcdURERkFcdUQ4M0NcdURERjggXHU3RjhFXHU1NkZEIC0xN2siLA0KICAiYWRkIjogImZiaS5nb3YiLA0KICAicG9ydCI6ICIyMDg2IiwNCiAgImlkIjogImU5ZTNjYzEzLWRiNDgtNGNjMS04YzI0LTc2MjY0MzlhNTMzOSIsDQogICJhaWQiOiAiMCIsDQogICJzY3kiOiAiYXV0byIsDQogICJuZXQiOiAid3MiLA0KICAidHlwZSI6ICJub25lIiwNCiAgImhvc3QiOiAiaXAyLjE0NTcyMzAueHl6IiwNCiAgInBhdGgiOiAiZ2l0aHViLmNvbS9BbHZpbjk5OTkiLA0KICAidGxzIjogIiIsDQogICJzbmkiOiAiaXAyLjE0NTcyMzAueHl6IiwNCiAgImFscG4iOiAiaDMsaDIsaHR0cC8xLjEiLA0KICAiZnAiOiAiZWRnZSINCn0=
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjExOS1cdTUyQTBcdTYyRkZcdTU5MjdfMDgxODEzMDI5IiwNCiAgImFkZCI6ICIyMy4yMjcuMzguMTQ1IiwNCiAgInBvcnQiOiAiODAiLA0KICAiaWQiOiAiZWMyODZmMTMtN2UxYS00MmJjLTlkZWItNzZiOTFiNGI5ZDJkIiwNCiAgImFpZCI6ICIwIiwNCiAgInNjeSI6ICJhdXRvIiwNCiAgIm5ldCI6ICJ3cyIsDQogICJ0eXBlIjogIm5vbmUiLA0KICAiaG9zdCI6ICJ3d3cuaXJhbnNlbGwuaXIuMTI3LjAuMC4xLmRsMy5cdTA0NERcdTA0MzJcdTA0NDBcdTA0MzhcdTA0M0FcdTA0MzAubXJhcnNoYS5cdTVDMjRcdTkxQ0NcdTUzNjFcdTA0NDFcdTA0M0ZcdTA0MzVcdTA0NDZcdTA0MzhcdTA0MzBcdTA0M0JcdTA0MzhcdTA0NDFcdTA0NDIud29ua2FjYXBpdGFuby5idXp6LiIsDQogICJwYXRoIjogIi92bWVzcyN0LW1lLURhcmtWUE5wcm8jdC1tZS1EYXJrVlBOcHJvI3QtbWUtRGFya1ZQTnBybyN0LW1lLURhcmtWUE5wcm8iLA0KICAidGxzIjogIiIsDQogICJzbmkiOiAid3d3LmlyYW5zZWxsLmlyLjEyNy4wLjAuMS5kbDMuXHUwNDREXHUwNDMyXHUwNDQwXHUwNDM4XHUwNDNBXHUwNDMwLm1yYXJzaGEuXHU1QzI0XHU5MUNDXHU1MzYxXHUwNDQxXHUwNDNGXHUwNDM1XHUwNDQ2XHUwNDM4XHUwNDMwXHUwNDNCXHUwNDM4XHUwNDQxXHUwNDQyLndvbmthY2FwaXRhbm8uYnV6ei4iLA0KICAiYWxwbiI6ICJoMyxoMiIsDQogICJmcCI6ICJlZGdlIg0KfQ==
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjEzMi1cdTY3MkFcdTc3RTVfMDgxODEzMjQ3IiwNCiAgImFkZCI6ICIxMDQuMTkuNDQuMTc0IiwNCiAgInBvcnQiOiAiODA4MCIsDQogICJpZCI6ICIzZmRmOWQ0OC01NzhhLTQyZGMtOWZkZC0wZGZjZWZhM2QwYzUiLA0KICAiYWlkIjogIjAiLA0KICAic2N5IjogImF1dG8iLA0KICAibmV0IjogIndzIiwNCiAgInR5cGUiOiAibm9uZSIsDQogICJob3N0IjogImFtZDIuNzIwMjA4Lnh5eiIsDQogICJwYXRoIjogIi8/ZWQ9MjA0OCIsDQogICJ0bHMiOiAiIiwNCiAgInNuaSI6ICJhbWQyLjcyMDIwOC54eXoiLA0KICAiYWxwbiI6ICJoMyxoMixodHRwLzEuMSIsDQogICJmcCI6ICJjaHJvbWUiDQp9
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjEzOC1cdTY3MkFcdTc3RTVfMDgxODEzMDgxIiwNCiAgImFkZCI6ICIxMDQuMTkuNDcuNDUiLA0KICAicG9ydCI6ICIyMDg2IiwNCiAgImlkIjogImU5ZTNjYzEzLWRiNDgtNGNjMS04YzI0LTc2MjY0MzlhNTMzOSIsDQogICJhaWQiOiAiMCIsDQogICJzY3kiOiAiYXV0byIsDQogICJuZXQiOiAid3MiLA0KICAidHlwZSI6ICJhdXRvIiwNCiAgImhvc3QiOiAiaXAxNC5mcmVlZ3JhZGVseS54eXoiLA0KICAicGF0aCI6ICJnaXRodWIuY29tL0FsdmluOTk5OSIsDQogICJ0bHMiOiAiIiwNCiAgInNuaSI6ICJpcDE0LmZyZWVncmFkZWx5Lnh5eiIsDQogICJhbHBuIjogImh0dHAvMS4xIiwNCiAgImZwIjogInNhZmFyaSINCn0=
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjE0MS1cdTY3MkFcdTc3RTVfMDgxODEzNjMzIiwNCiAgImFkZCI6ICIxMDQuMjYuMTAuMTEiLA0KICAicG9ydCI6ICIyMDg2IiwNCiAgImlkIjogImU5ZTNjYzEzLWRiNDgtNGNjMS04YzI0LTc2MjY0MzlhNTMzOSIsDQogICJhaWQiOiAiMCIsDQogICJzY3kiOiAiYXV0byIsDQogICJuZXQiOiAid3MiLA0KICAidHlwZSI6ICJhdXRvIiwNCiAgImhvc3QiOiAiaXAxLjE3ODkwMzQueHl6IiwNCiAgInBhdGgiOiAiZ2l0aHViLmNvbS9BbHZpbjk5OTkiLA0KICAidGxzIjogIiIsDQogICJzbmkiOiAiaXAxLjE3ODkwMzQueHl6IiwNCiAgImFscG4iOiAiaDMsaDIsaHR0cC8xLjEiLA0KICAiZnAiOiAiY2hyb21lIg0KfQ==
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjE1Mi1cdUQ4M0NcdURGQzFSRUxBWS0xMDQuMTkuNDYuNjMtMDI3NyIsDQogICJhZGQiOiAiMTA0LjE5LjQ2LjYzIiwNCiAgInBvcnQiOiAiMjA4NiIsDQogICJpZCI6ICJlOWUzY2MxMy1kYjQ4LTRjYzEtOGMyNC03NjI2NDM5YTUzMzkiLA0KICAiYWlkIjogIjAiLA0KICAic2N5IjogImF1dG8iLA0KICAibmV0IjogIndzIiwNCiAgInR5cGUiOiAiYXV0byIsDQogICJob3N0IjogImlwMi4xNDU3MjMwLnh5eiIsDQogICJwYXRoIjogImdpdGh1Yi5jb20vQWx2aW45OTk5IiwNCiAgInRscyI6ICIiLA0KICAic25pIjogImlwMi4xNDU3MjMwLnh5eiIsDQogICJhbHBuIjogImgzLGgyLGh0dHAvMS4xIiwNCiAgImZwIjogImVkZ2UiDQp9
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjE1My1cdUQ4M0NcdURGQzFSRUxBWS0xMDQuMTcuMTA2LjE1MS0wMjkwIiwNCiAgImFkZCI6ICIxMDQuMTcuMTA2LjE1MSIsDQogICJwb3J0IjogIjIwODYiLA0KICAiaWQiOiAiZTllM2NjMTMtZGI0OC00Y2MxLThjMjQtNzYyNjQzOWE1MzM5IiwNCiAgImFpZCI6ICIwIiwNCiAgInNjeSI6ICJhdXRvIiwNCiAgIm5ldCI6ICJ3cyIsDQogICJ0eXBlIjogImF1dG8iLA0KICAiaG9zdCI6ICJpcDE0LmZyZWVncmFkZWx5Lnh5eiIsDQogICJwYXRoIjogImdpdGh1Yi5jb20vQWx2aW45OTk5IiwNCiAgInRscyI6ICIiLA0KICAic25pIjogImlwMTQuZnJlZWdyYWRlbHkueHl6IiwNCiAgImFscG4iOiAiaDMsaDIiLA0KICAiZnAiOiAiY2hyb21lIg0KfQ==
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjE1OC1cdUQ4M0NcdURGQzFSRUxBWS0xMDQuMTkuMzguODgtMDI2MiIsDQogICJhZGQiOiAiMTA0LjE5LjM4Ljg4IiwNCiAgInBvcnQiOiAiMjA4NiIsDQogICJpZCI6ICJlOWUzY2MxMy1kYjQ4LTRjYzEtOGMyNC03NjI2NDM5YTUzMzkiLA0KICAiYWlkIjogIjAiLA0KICAic2N5IjogImF1dG8iLA0KICAibmV0IjogIndzIiwNCiAgInR5cGUiOiAiYXV0byIsDQogICJob3N0IjogImlwNS00LmZyZWVncmFkZWx5Lnh5eiIsDQogICJwYXRoIjogImdpdGh1Yi5jb20vQWx2aW45OTk5IiwNCiAgInRscyI6ICIiLA0KICAic25pIjogImlwNS00LmZyZWVncmFkZWx5Lnh5eiIsDQogICJhbHBuIjogImgzLGgyIiwNCiAgImZwIjogInNhZmFyaSINCn0=
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjE1OS1cdUQ4M0NcdURGQzFSRUxBWS0xMDQuMTkuNDQuMTc0LTA0MTciLA0KICAiYWRkIjogIjEwNC4xOS40NC4xNzQiLA0KICAicG9ydCI6ICI4MDgwIiwNCiAgImlkIjogIjNmZGY5ZDQ4LTU3OGEtNDJkYy05ZmRkLTBkZmNlZmEzZDBjNSIsDQogICJhaWQiOiAiMCIsDQogICJzY3kiOiAiYXV0byIsDQogICJuZXQiOiAid3MiLA0KICAidHlwZSI6ICJhdXRvIiwNCiAgImhvc3QiOiAiYW1kMi43MjAyMDgueHl6IiwNCiAgInBhdGgiOiAiLz9lZD0yMDQ4IiwNCiAgInRscyI6ICIiLA0KICAic25pIjogImFtZDIuNzIwMjA4Lnh5eiIsDQogICJhbHBuIjogImh0dHAvMS4xIiwNCiAgImZwIjogInJhbmRvbWl6ZWQiDQp9
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjE5MC1cdUQ4M0NcdURERkFcdUQ4M0NcdURERjggXHU3RjhFXHU1NkZEIENsb3VkRmxhcmVcdTgyODJcdTcwQjkiLA0KICAiYWRkIjogIjEwNC4xOS40NS4xMSIsDQogICJwb3J0IjogIjIwODYiLA0KICAiaWQiOiAiZTllM2NjMTMtZGI0OC00Y2MxLThjMjQtNzYyNjQzOWE1MzM5IiwNCiAgImFpZCI6ICIwIiwNCiAgInNjeSI6ICJhdXRvIiwNCiAgIm5ldCI6ICJ3cyIsDQogICJ0eXBlIjogIm5vbmUiLA0KICAiaG9zdCI6ICJpcDEuMTQ1NzIzMC54eXoiLA0KICAicGF0aCI6ICJnaXRodWIuY29tL0FsdmluOTk5OSIsDQogICJ0bHMiOiAiIiwNCiAgInNuaSI6ICJpcDEuMTQ1NzIzMC54eXoiLA0KICAiYWxwbiI6ICJoMyxoMixodHRwLzEuMSIsDQogICJmcCI6ICJyYW5kb21pemVkIg0KfQ==
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjE5My1cdUQ4M0NcdURERThcdUQ4M0NcdURERjMgXHU1RTdGXHU0RTFDXHU3NzAxXHU2REYxXHU1NzMzXHU1RTAyIFx1NzUzNVx1NEZFMSIsDQogICJhZGQiOiAibW1maTg1Lm1pY2xvdWQuYnV6eiIsDQogICJwb3J0IjogIjQ2MDg1IiwNCiAgImlkIjogImE2ZTE5NDNiLWNhODgtNGQ3Ni1iMDQxLTk3ODJiZTU2YTU0ZCIsDQogICJhaWQiOiAiMCIsDQogICJzY3kiOiAiYXV0byIsDQogICJuZXQiOiAid3MiLA0KICAidHlwZSI6ICJub25lIiwNCiAgImhvc3QiOiAibW1maTg1Lm1pY2xvdWQuYnV6eiIsDQogICJwYXRoIjogIi96aC1jbiIsDQogICJ0bHMiOiAiIiwNCiAgInNuaSI6ICJtbWZpODUubWljbG91ZC5idXp6IiwNCiAgImFscG4iOiAiaDMsaDIsaHR0cC8xLjEiLA0KICAiZnAiOiAicmFuZG9taXplZCINCn0=
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjEyOS0yNmsiLA0KICAiYWRkIjogIjEwNC4yNi43LjEzMiIsDQogICJwb3J0IjogIjIwODYiLA0KICAiaWQiOiAiZTllM2NjMTMtZGI0OC00Y2MxLThjMjQtNzYyNjQzOWE1MzM5IiwNCiAgImFpZCI6ICIwIiwNCiAgInNjeSI6ICJhdXRvIiwNCiAgIm5ldCI6ICJ3cyIsDQogICJ0eXBlIjogImF1dG8iLA0KICAiaG9zdCI6ICJpcDIuMTQ1NzIzMC54eXoiLA0KICAicGF0aCI6ICJnaXRodWIuY29tL0FsdmluOTk5OSIsDQogICJ0bHMiOiAiIiwNCiAgInNuaSI6ICJpcDIuMTQ1NzIzMC54eXoiLA0KICAiYWxwbiI6ICIiLA0KICAiZnAiOiAiIg0KfQ==
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjEzOS1cdTY3MkFcdTc3RTVfMDgwMjA0MjY4IiwNCiAgImFkZCI6ICIxMDQuMjYuNS4xMTIiLA0KICAicG9ydCI6ICIyMDg2IiwNCiAgImlkIjogImU5ZTNjYzEzLWRiNDgtNGNjMS04YzI0LTc2MjY0MzlhNTMzOSIsDQogICJhaWQiOiAiMCIsDQogICJzY3kiOiAiYXV0byIsDQogICJuZXQiOiAid3MiLA0KICAidHlwZSI6ICJub25lIiwNCiAgImhvc3QiOiAiaXAxLjE3ODkwMzQueHl6IiwNCiAgInBhdGgiOiAiZ2l0aHViLmNvbS9BbHZpbjk5OTkiLA0KICAidGxzIjogIiIsDQogICJzbmkiOiAiaXAxLjE3ODkwMzQueHl6IiwNCiAgImFscG4iOiAiaDIsaHR0cC8xLjEiLA0KICAiZnAiOiAiYW5kcm9pZCINCn0=
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjE5MC1cdUQ4M0NcdURERkFcdUQ4M0NcdURERjggXHU3RjhFXHU1NkZEIC0zMmsiLA0KICAiYWRkIjogIjE3Mi42NC4yMzMuNDMiLA0KICAicG9ydCI6ICIyMDg2IiwNCiAgImlkIjogImU5ZTNjYzEzLWRiNDgtNGNjMS04YzI0LTc2MjY0MzlhNTMzOSIsDQogICJhaWQiOiAiMCIsDQogICJzY3kiOiAiYXV0byIsDQogICJuZXQiOiAid3MiLA0KICAidHlwZSI6ICJub25lIiwNCiAgImhvc3QiOiAiaXAyLjE0NTcyMzAueHl6IiwNCiAgInBhdGgiOiAiZ2l0aHViLmNvbS9BbHZpbjk5OTkiLA0KICAidGxzIjogIiIsDQogICJzbmkiOiAiaXAyLjE0NTcyMzAueHl6IiwNCiAgImFscG4iOiAiaDMsaDIsaHR0cC8xLjEiLA0KICAiZnAiOiAiZWRnZSINCn0=
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjEzNy0yM2siLA0KICAiYWRkIjogImZiaS5nb3YiLA0KICAicG9ydCI6ICIyMDg2IiwNCiAgImlkIjogImU5ZTNjYzEzLWRiNDgtNGNjMS04YzI0LTc2MjY0MzlhNTMzOSIsDQogICJhaWQiOiAiMCIsDQogICJzY3kiOiAiYXV0byIsDQogICJuZXQiOiAid3MiLA0KICAidHlwZSI6ICJhdXRvIiwNCiAgImhvc3QiOiAiaXAxLjE3ODkwMzQueHl6IiwNCiAgInBhdGgiOiAiZ2l0aHViLmNvbS9BbHZpbjk5OTkiLA0KICAidGxzIjogIiIsDQogICJzbmkiOiAiaXAxLjE3ODkwMzQueHl6IiwNCiAgImFscG4iOiAiaDMsaDIsaHR0cC8xLjEiLA0KICAiZnAiOiAiY2hyb21lIg0KfQ==
vmess://ew0KICAidiI6ICIyIiwNCiAgInBzIjogIjEzNi0zNmsiLA0KICAiYWRkIjogIjEwNC4xOS40NS4zMSIsDQogICJwb3J0IjogIjIwODYiLA0KICAiaWQiOiAiZTllM2NjMTMtZGI0OC00Y2MxLThjMjQtNzYyNjQzOWE1MzM5IiwNCiAgImFpZCI6ICIwIiwNCiAgInNjeSI6ICJhdXRvIiwNCiAgIm5ldCI6ICJ3cyIsDQogICJ0eXBlIjogImF1dG8iLA0KICAiaG9zdCI6ICJpcDEzLmZyZWVncmFkZWx5Lnh5eiIsDQogICJwYXRoIjogImdpdGh1Yi5jb20vQWx2aW45OTk5IiwNCiAgInRscyI6ICIiLA0KICAic25pIjogImlwMTMuZnJlZWdyYWRlbHkueHl6IiwNCiAgImFscG4iOiAiaDMsaDIsaHR0cC8xLjEiLA0KICAiZnAiOiAiY2hyb21lIg0KfQ==

`

let urls = [];
let subconverter = "SUBAPI.fxxk.dedyn.io"; //在线订阅转换后端，目前使用CM的订阅转换功能。支持自建psub 可自行搭建https://github.com/bulianglin/psub
let subconfig = "https://raw.githubusercontent.com/cmliu/ACL4SSR/main/Clash/config/ACL4SSR_Online_MultiCountry.ini"; //订阅配置文件
let subProtocol = 'https';

export default {
	async fetch (request,env) {
		const userAgentHeader = request.headers.get('User-Agent');
		const userAgent = userAgentHeader ? userAgentHeader.toLowerCase() : "null";
		const url = new URL(request.url);
		const token = url.searchParams.get('token');
		mytoken = env.TOKEN || mytoken;
		BotToken = env.TGTOKEN || BotToken;
		ChatID = env.TGID || ChatID; 
		TG =  env.TG || TG; 
		subconverter = env.SUBAPI || subconverter;
		if( subconverter.includes("http://") ){
			subconverter = subconverter.split("//")[1];
			subProtocol = 'http';
		} else {
			subconverter = subconverter.split("//")[1] || subconverter;
		}
		subconfig = env.SUBCONFIG || subconfig;
		FileName = env.SUBNAME || FileName;
		MainData = env.LINK || MainData;
		if(env.LINKSUB) urls = await ADD(env.LINKSUB);

		const currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0); 
		const timeTemp = Math.ceil(currentDate.getTime() / 1000);
		const fakeToken = await MD5MD5(`${mytoken}${timeTemp}`);
		//console.log(`${fakeUserID}\n${fakeHostName}`); // 打印fakeID

		let UD = Math.floor(((timestamp - Date.now())/timestamp * total * 1099511627776 )/2);
		total = total * 1099511627776 ;
		let expire= Math.floor(timestamp / 1000) ;
		SUBUpdateTime = env.SUBUPTIME || SUBUpdateTime;

		let 重新汇总所有链接 = await ADD(MainData + '\n' + urls.join('\n'));
		let 自建节点 ="";
		let 订阅链接 ="";
		for (let x of 重新汇总所有链接) {
			if (x.toLowerCase().startsWith('http')) {
				订阅链接 += x + '\n';
			} else {
				自建节点 += x + '\n';
			}
		}
		MainData = 自建节点;
		urls = await ADD(订阅链接);

		if ( !(token == mytoken || token == fakeToken || url.pathname == ("/"+ mytoken) || url.pathname.includes("/"+ mytoken + "?")) ) {
			if ( TG == 1 && url.pathname !== "/" && url.pathname !== "/favicon.ico" ) await sendMessage(`#异常访问 ${FileName}`, request.headers.get('CF-Connecting-IP'), `UA: ${userAgent}</tg-spoiler>\n域名: ${url.hostname}\n<tg-spoiler>入口: ${url.pathname + url.search}</tg-spoiler>`);
			const envKey = env.URL302 ? 'URL302' : (env.URL ? 'URL' : null);
			if (envKey) {
				const URLs = await ADD(env[envKey]);
				const URL = URLs[Math.floor(Math.random() * URLs.length)];
				return envKey === 'URL302' ? Response.redirect(URL, 302) : fetch(new Request(URL, request));
			}
			return new Response(await nginx(), { 
				status: 200 ,
				headers: {
					'Content-Type': 'text/html; charset=UTF-8',
				},
			});
		} else {
			await sendMessage(`#获取订阅 ${FileName}`, request.headers.get('CF-Connecting-IP'), `UA: ${userAgentHeader}</tg-spoiler>\n域名: ${url.hostname}\n<tg-spoiler>入口: ${url.pathname + url.search}</tg-spoiler>`);
			let 订阅格式 = 'base64';
			if (userAgent.includes('null') || userAgent.includes('subconverter') || userAgent.includes('nekobox') || userAgent.includes(('CF-Workers-SUB').toLowerCase())){
				订阅格式 = 'base64';
			} else if (userAgent.includes('clash') || ( url.searchParams.has('clash') && !userAgent.includes('subconverter'))){
				订阅格式 = 'clash';
			} else if (userAgent.includes('sing-box') || userAgent.includes('singbox') || ( (url.searchParams.has('sb') || url.searchParams.has('singbox')) && !userAgent.includes('subconverter'))){
				订阅格式 = 'singbox';
			} else if (userAgent.includes('surge') || ( url.searchParams.has('surge') && !userAgent.includes('subconverter'))){
				订阅格式 = 'surge';
			}

			let subconverterUrl ;
			let 订阅转换URL = `${url.origin}/${await MD5MD5(fakeToken)}?token=${fakeToken}`;
			//console.log(订阅转换URL);
			let req_data = MainData;

			// 初始化缓存
			const cache = caches.default;

			let 追加UA = 'v2rayn';
			if (url.searchParams.has('clash')){
				追加UA = 'clash';
			} else if(url.searchParams.has('singbox')){
				追加UA = 'singbox';
			} else if(url.searchParams.has('surge')){
				追加UA = 'surge';
			}
			
			try {
				const responses = await Promise.all(urls.map(async url => {
					const cacheKey = new Request(url);
					
					try {
						// 设置2秒超时
						const controller = new AbortController();
						const timeoutId = setTimeout(() => controller.abort(), 2000);
	
						const response = await fetch(url, {
							method: 'get',
							headers: {
								'Accept': 'text/html,application/xhtml+xml,application/xml;',
								'User-Agent': `${追加UA} cmliu/CF-Workers-SUB ${userAgentHeader}`
							},
							signal: controller.signal
						});
	
						clearTimeout(timeoutId);
	
						if (response.ok) {
							const content = await response.text();
							
							// 请求成功，写入缓存，设置24小时的缓存时间
							const cacheResponse = new Response(content, {
								headers: {
									...response.headers,
									'Cache-Control': `public, max-age=${cacheTTL * 60 * 60}`
								}
							});
							await cache.put(cacheKey, cacheResponse);
							console.log(`更新缓存 ${url}:\n${content.slice(0, 10)}...`);
							if (content.includes('dns') && content.includes('proxies') && content.includes('proxy-groups')) {
								// Clash 配置
								订阅转换URL += "|" + url;
								return ""; // 返回空字符串，因为这种情况下我们不需要内容
							} else if (content.includes('dns') && content.includes('outbounds') && content.includes('inbounds')){
								// Singbox 配置
								订阅转换URL += "|" + url;
								return ""; // 返回空字符串，因为这种情况下我们不需要内容
							} else {
								return content;
							}
						} else {
							throw new Error('请求失败');
						}
					} catch (error) {
						// 请求失败或超时，尝试从缓存读取
						const cachedResponse = await cache.match(cacheKey);
						if (cachedResponse) {
							const cachedContent = await cachedResponse.text();
							console.log(`使用缓存内容 ${url}:\n${cachedContent.slice(0, 10)}...`);
							return cachedResponse.text();
						} else {
							console.log(`无缓存可用 ${url}`);
							return ""; // 缓存中也没有，返回空字符串
						}
					}
				}));	
			
				for (const response of responses) {
					if (response) {
						req_data += base64Decode(response) + '\n';
					}
				}
			
			} catch (error) {
				console.error('处理 URL 时发生错误：', error);
			}

			//修复中文错误
			const utf8Encoder = new TextEncoder();
			const encodedData = utf8Encoder.encode(req_data);
			const text = String.fromCharCode.apply(null, encodedData);
			
			//去重
			const uniqueLines = new Set(text.split('\n'));
			const result = [...uniqueLines].join('\n');
			//console.log(result);
			
			const base64Data = btoa(result);

			if (订阅格式 == 'base64' || token == fakeToken){
				return new Response(base64Data ,{
					headers: { 
						"content-type": "text/plain; charset=utf-8",
						"Profile-Update-Interval": `${SUBUpdateTime}`,
						"Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,
					}
				});
			} else if (订阅格式 == 'clash'){
				subconverterUrl = `${subProtocol}://${subconverter}/sub?target=clash&url=${encodeURIComponent(订阅转换URL)}&insert=false&config=${encodeURIComponent(subconfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
			} else if (订阅格式 == 'singbox'){
				subconverterUrl = `${subProtocol}://${subconverter}/sub?target=singbox&url=${encodeURIComponent(订阅转换URL)}&insert=false&config=${encodeURIComponent(subconfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
			} else if (订阅格式 == 'surge'){
				subconverterUrl = `${subProtocol}://${subconverter}/sub?target=surge&url=${encodeURIComponent(订阅转换URL)}&insert=false&config=${encodeURIComponent(subconfig)}&emoji=true&list=false&tfo=false&scv=true&fdn=false&sort=false&new_name=true`;
			}
			//console.log(订阅转换URL);
			try {
				const subconverterResponse = await fetch(subconverterUrl);
				
				if (!subconverterResponse.ok) {
					return new Response(base64Data ,{
						headers: { 
							"content-type": "text/plain; charset=utf-8",
							"Profile-Update-Interval": `${SUBUpdateTime}`,
							"Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,
						}
					});
					//throw new Error(`Error fetching subconverterUrl: ${subconverterResponse.status} ${subconverterResponse.statusText}`);
				}
				let subconverterContent = await subconverterResponse.text();
				if (订阅格式 == 'clash') subconverterContent =await clashFix(subconverterContent);
				return new Response(subconverterContent, {
					headers: { 
						"Content-Disposition": `attachment; filename*=utf-8''${encodeURIComponent(FileName)}; filename=${FileName}`,
						"content-type": "text/plain; charset=utf-8",
						"Profile-Update-Interval": `${SUBUpdateTime}`,
						"Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,

					},
				});
			} catch (error) {
				return new Response(base64Data ,{
					headers: { 
						"content-type": "text/plain; charset=utf-8",
						"Profile-Update-Interval": `${SUBUpdateTime}`,
						"Subscription-Userinfo": `upload=${UD}; download=${UD}; total=${total}; expire=${expire}`,
					}
				});
			}
		}
	}
};

async function ADD(envadd) {
	var addtext = envadd.replace(/[	"'|\r\n]+/g, ',').replace(/,+/g, ',');  // 将空格、双引号、单引号和换行符替换为逗号
	//console.log(addtext);
	if (addtext.charAt(0) == ',') addtext = addtext.slice(1);
	if (addtext.charAt(addtext.length -1) == ',') addtext = addtext.slice(0, addtext.length - 1);
	const add = addtext.split(',');
	//console.log(add);
	return add ;
}

async function nginx() {
	const text = `
	<!DOCTYPE html>
	<html>
	<head>
	<title>Welcome to nginx!</title>
	<style>
		body {
			width: 35em;
			margin: 0 auto;
			font-family: Tahoma, Verdana, Arial, sans-serif;
		}
	</style>
	</head>
	<body>
	<h1>Welcome to nginx!</h1>
	<p>If you see this page, the nginx web server is successfully installed and
	working. Further configuration is required.</p>
	
	<p>For online documentation and support please refer to
	<a href="http://nginx.org/">nginx.org</a>.<br/>
	Commercial support is available at
	<a href="http://nginx.com/">nginx.com</a>.</p>
	
	<p><em>Thank you for using nginx.</em></p>
	</body>
	</html>
	`
	return text ;
}

async function sendMessage(type, ip, add_data = "") {
	if ( BotToken !== '' && ChatID !== ''){
		let msg = "";
		const response = await fetch(`http://ip-api.com/json/${ip}?lang=zh-CN`);
		if (response.status == 200) {
			const ipInfo = await response.json();
			msg = `${type}\nIP: ${ip}\n国家: ${ipInfo.country}\n<tg-spoiler>城市: ${ipInfo.city}\n组织: ${ipInfo.org}\nASN: ${ipInfo.as}\n${add_data}`;
		} else {
			msg = `${type}\nIP: ${ip}\n<tg-spoiler>${add_data}`;
		}
	
		let url = "https://api.telegram.org/bot"+ BotToken +"/sendMessage?chat_id=" + ChatID + "&parse_mode=HTML&text=" + encodeURIComponent(msg);
		return fetch(url, {
			method: 'get',
			headers: {
				'Accept': 'text/html,application/xhtml+xml,application/xml;',
				'Accept-Encoding': 'gzip, deflate, br',
				'User-Agent': 'Mozilla/5.0 Chrome/90.0.4430.72'
			}
		});
	}
}

function base64Decode(str) {
	const bytes = new Uint8Array(atob(str).split('').map(c => c.charCodeAt(0)));
	const decoder = new TextDecoder('utf-8');
	return decoder.decode(bytes);
}

async function MD5MD5(text) {
	const encoder = new TextEncoder();
  
	const firstPass = await crypto.subtle.digest('MD5', encoder.encode(text));
	const firstPassArray = Array.from(new Uint8Array(firstPass));
	const firstHex = firstPassArray.map(b => b.toString(16).padStart(2, '0')).join('');

	const secondPass = await crypto.subtle.digest('MD5', encoder.encode(firstHex.slice(7, 27)));
	const secondPassArray = Array.from(new Uint8Array(secondPass));
	const secondHex = secondPassArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
	return secondHex.toLowerCase();
}

function clashFix(content) {
	if(content.includes('wireguard') && !content.includes('remote-dns-resolve')){
		let lines;
		if (content.includes('\r\n')){
			lines = content.split('\r\n');
		} else {
			lines = content.split('\n');
		}
	
		let result = "";
		for (let line of lines) {
			if (line.includes('type: wireguard')) {
				const 备改内容 = `, mtu: 1280, udp: true`;
				const 正确内容 = `, mtu: 1280, remote-dns-resolve: true, udp: true`;
				result += line.replace(new RegExp(备改内容, 'g'), 正确内容) + '\n';
			} else {
				result += line + '\n';
			}
		}

		content = result;
	}
	return content;
}
