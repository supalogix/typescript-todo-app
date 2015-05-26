#!/bin/bash

JASMINE="jasmine-node"
TEST_DIR=`pwd`
export NODE_TODOLISTMODEL="$TEST_DIR/app/ui_feature/todo_list/model/TodoListModel.js"
export TODO_APP="$TEST_DIR/app/todo.js"
export TEST_DIR="$TEST_DIR"

$JASMINE --verbose --junitreport  app/
