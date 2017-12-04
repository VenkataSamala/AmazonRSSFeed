var app = angular.module("myApp", ['ngSanitize']);
app.controller("myCtrl", function ($scope, $http, $location, PagerService) {
    $scope.items = [];
    $scope.allitems = [];

    $scope.pager = {};

    $scope.getItems = function (itemType) {
        $http.get('/Home/GetItems/?itemType=' + itemType)
            .then(function (response) {
                $scope.items = [];
                $scope.allitems = [];
                $.each(response.data,
                    function (i, value) {
                        var r = {};
                        r.Title = value.Title;
                        r.Guid_Id = value.Guid_Id;
                        r.Link = value.Link;
                        r.PubDate = value.PubDate;
                        r.Description = value.Description;
                        $scope.allitems.push(r);
                    });
                $scope.initController();
            });
    };
    $scope.getItems('ebooks');


    $scope.setPage = function (page) {
        if (page < 1 || page > $scope.pager.totalPages) {
            return;
        }

        // get pager object from service
        $scope.pager = PagerService.GetPager($scope.allitems.length, page, 5);

        // get current page of items
        $scope.items = $scope.allitems.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    };

    $scope.initController = function () {
        // initialize to page 1
        $scope.setPage(1);
    };



});

app.service('PagerService', function () {
    this.GetPager = function (totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);


        function range(minValue, maxValue, step) {
            var resArray = [];
            if (!isNaN(minValue) || !isNaN(maxValue) || !isNaN(step)) {
                for (var i = minValue; i <= maxValue; i = i + step) {
                    resArray.push(i);
                }
            }
            return resArray;
        }

        // create an array of pages to ng-repeat in the pager control
        var pages = range(startPage, endPage, 1);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
});