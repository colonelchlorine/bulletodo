angular.module("myApp", []).controller("TreeController", ['$scope', function($scope) {
    $scope.delete = function(data) {
        data.nodes = [];
    };
    $scope.add = function(data) {
        var post = data.nodes.length + 1;
        var newName = data.name + '-' + post;
        data.nodes.push({name: newName, nodes: [], done:false, edit: false, nodeHide: false});
    };

    $scope.flipEdit = function (data) {
        data.edit = !data.edit;
    };

    $scope.editSave = function (data, $event, isBlurred) {
        //Enter or blurred
        if (data.edit === true && ($event.which == 13 || isBlurred)) {
            data.name = $event.target.value;
            this.flipEdit(data);
        }
    };

    $scope.nodeHide = function (data, hideIt) {
        data.nodeHide = hideIt;
    }

    $scope.addTodo = function(tree, $event) {
        //Enter
        if ($event.which == 13) {
            tree.push({name:$event.target.value, nodes: [], done:false, edit: false, nodeHide: false});
            $event.target.value = "";

            $event.preventDefault();
        //Tab
        } else if ($event.which == 9) {
            $event.preventDefault();
        //Up
        } else if ($event.which == 38) {
            console.log(tree.length);
            $event.preventDefault();
        //Down
        } else if ($event.which == 40) {
            $event.preventDefault();
        }
    };

    $scope.tree = [];
}]);