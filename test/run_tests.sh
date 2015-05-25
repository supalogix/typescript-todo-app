#!/bin/bash

JASMINE="node_modules/jasmine-node/bin/jasmine-node"
TEST_DIR=`pwd`
export NODE_TODOLISTMODEL="$TEST_DIR/app/ui_feature/todo_list/model/TodoListModel.js"

$JASMINE --verbose --junitreport  app/
