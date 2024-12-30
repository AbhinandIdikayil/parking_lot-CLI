@echo off
:loop
set /p command="parking_lot> "
if "%command%"=="" goto loop
if /i "%command%"=="exit" exit
node "%~dp0\..\build\index.js" %command%
goto loop
