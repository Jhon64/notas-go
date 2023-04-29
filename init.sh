#!/bin/bash
if [[ "$OSTYPE" == "linux-gnu"* ]]; then # comando para LINUX

  konsole & sleep 1

   qdbus org.kde.konsole-$! /konsole/MainWindow_1 org.kde.KMainWindow.activateAction split-view-left-right
  qdbus org.kde.konsole-$! /konsole/MainWindow_1 org.kde.KMainWindow.activateAction split-view-top-bottom

  qdbus org.kde.konsole-$! /Windows/1 org.kde.konsole.Window.setCurrentSession 1
  qdbus org.kde.konsole-$! /Sessions/1 setTitle 1 'FRONTEND'
  qdbus org.kde.konsole-$! /Sessions/1 runCommand 'cd ./frontend && yarn dev'

  qdbus org.kde.konsole-$! /Sessions/2 setTitle 2 'BACKEND'
  qdbus org.kde.konsole-$! /Sessions/2 runCommand 'cd ./backend && air'

  qdbus org.kde.konsole-$! /Sessions/3 setTitle 3 'PANTALLA DE COMANDOS'
  qdbus org.kde.konsole-$! /Sessions/3 runCommand 'cd ./frontend'

#   qdbus org.kde.konsole-$! /Sessions/3 setTitle 1 'FRONTEND - VITE'
#   qdbus org.kde.konsole-$! /Sessions/3 runCommand 'cd ./frontend && npm start'

  qdbus org.kde.konsole-$! /Windows/1 org.kde.konsole.Window.setCurrentSession 1
  qdbus org.kde.konsole-$! /Sessions/0 setTitle 1 'PROYECTO DRTC'

#  else # comando para WINDOWS
 fi
