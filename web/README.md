

## 安裝

1. 前往資料夾:
```
cd web/backend
```
2. 安裝 virtualenv, flask

    參考http://flask.pocoo.org/docs/0.12/installation/

3. 啟動 virtualevn:

Linux:
```
$. venv/bin/activate
```
Windows:
```
$ venv\Scripts\activate
```

4. 啟動flask 伺服器

Linux: 
```
$ export FLASK_APP=server.py
```
Windows:
```
FLASK_APP=server.py
```
PowerShell:
```
$env:FLASK_APP = "server.py"
```
然後:
```
$ flask run
```