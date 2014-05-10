angular.module("myApp", []).service('uuid4', function() {
  /**! http://stackoverflow.com/a/2117523/377392 */
  var fmt = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  this.generate = function() {
    return fmt.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  };
}).controller("TreeController", ['$scope', 'uuid4', function($scope, uuid4) {
    $scope.tree = [];
    
    $scope.init = function () {
        $scope.tree = JSON.parse(window.localStorage.getItem("bullets"));

        if ($scope.tree === null) {
            $scope.tree = [];
        }
    }

    $scope.delete = function(data) {
        data.nodes = [];
        $scope.save();
    };

    $scope.add = function(data) {
        var post = data.nodes.length + 1;
        var newName = data.name + '-' + post;
        data.nodes.push({name: newName, nodes: [], done:false, hide: false, guid: uuid4.generate()});
        $scope.save();
    };

    $scope.flipEdit = function (data) {
        data.edit = !data.edit;
        $scope.save();
    };

    $scope.editSave = function (data, $event, isBlurred) {
        //Enter or blurred
        if ($event.which == 13 || isBlurred) {
            data.name = $event.target.value;
            this.flipEdit(data);
        }
        $scope.save();
    };

    $scope.hide = function (data, hideIt) {
        data.hide = hideIt;
        $scope.save();
    }

    $scope.addTodo = function(tree, $event) {
        //Enter
        if ($event.which == 13) {
            tree.push({name:$event.target.value, nodes: [], done:false, hide: false, guid: uuid4.generate()});
            $scope.save();
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

    $scope.save = function () {
        window.localStorage.setItem("bullets", JSON.stringify($scope.tree));
    }
}]);

