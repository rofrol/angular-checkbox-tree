var app, list;
list = [
    {
        name: 'Developer',
        opened: true,
        children: [
            {
                name: 'Front-End',
                children: [
                    {
                        name: 'Jack',
                        title: 'Leader'
                    },
                    {
                        name: 'John',
                        title: 'Senior F2E'
                    },
                    {
                        name: 'Jason',
                        title: 'Junior F2E'
                    }
                ]
            },
            {
                name: 'Back-End',
                children: [
                    {
                        name: 'Mary',
                        title: 'Leader'
                    },
                    {
                        name: 'Gary',
                        title: 'Intern'
                    }
                ]
            }
        ]
    },
    {
        name: 'Design',
        children: [{
            name: 'Freeman',
            title: 'Designer'
        }]
    },
    {
        name: 'S&S',
        children: [{
            name: 'Nikky',
            title: 'Robot'
        }]
    }
];
app = angular.module('testApp', []).controller('treeTable', [
    '$scope',
    '$filter',
    function ($scope, $filter) {
        $scope.list = list;
        $scope.initCheckbox = function (item, parentItem) {
            return item.selected = parentItem && parentItem.selected || item.selected || false;
        };
        $scope.toggleCheckbox = function (item, parentScope) {
            if (item.children != null) {
                $scope.$broadcast('changeChildren', item);
            }
            if (parentScope.item != null) {
                return $scope.$emit('changeParent', parentScope);
            }
        };
        $scope.$on('changeChildren', function (event, parentItem) {
            var child, i, len, ref, results;
            ref = parentItem.children;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
                child = ref[i];
                child.selected = parentItem.selected;
                if (child.children != null) {
                    results.push($scope.$broadcast('changeChildren', child));
                } else {
                    results.push(void 0);
                }
            }
            return results;
        });
        return $scope.$on('changeParent', function (event, parentScope) {
            var children;
            children = parentScope.item.children;
            parentScope.item.selected = $filter('selected')(children).length === children.length;
            parentScope = parentScope.$parent.$parent;
            if (parentScope.item != null) {
                return $scope.$broadcast('changeParent', parentScope);
            }
        });
    }
]);
app.filter('selected', [
    '$filter',
    function ($filter) {
        return function (files) {
            return $filter('filter')(files, { selected: true });
        };
    }
]);