var app = angular.module('flickr', []);
	app.controller('myController', ['$scope', '$http', function ($scope, $http) {

			// console.log($scope, $http);

			var base ='https://api.flickr.com/services/rest/?&method=';
			var apiKey='9da9cb35fd91c0b5d95b991635bb820b';
			var userId=  '127919138@N08';


			$scope.main = {
                page: 1,
                take: 6
            };

   			

			// Make angular request to search for photos
			$scope.getUser = function(){

				$scope.imgCont=true;

				$scope.loading = true;
				$scope.navi = false;

				// console.log($scope.username);
				var phototag = $scope.username;
				$http.jsonp(base + 'flickr.photos.search&api_key=' + apiKey + '&tags=' + phototag + '&page=' + $scope.main.page + '&per_page=6&extras=geo,url_o&format=json&jsoncallback=JSON_CALLBACK').success(function(response){

					 	$scope.loading = false;
					  	$scope.navi = true;
					
						$scope.posts = response.photos.photo;
						$scope.main.pages = response.photos.pages;
					

					
						// Next Page navigation button method
						$scope.nextPage = function() {
                			if ($scope.main.page < $scope.main.pages) {
                    			$scope.main.page++;
                    
                    			$scope.getUser();
                			}
            			};


       					// Next Page navigation button method
            			$scope.previousPage = function() {
                			if ($scope.main.page > 1) {
                    			$scope.main.page--;
                    			$scope.getUser();
                			}
            			};

					
				});
			};


			// Make angular request to get recent photos
			$scope.getRecent = function(){

				$scope.imgCont=true;

				$scope.loading = true;
				$scope.navi = false;
				// console.log($scope.username);
				$http.jsonp(base + 'flickr.photos.getRecent&api_key=' + apiKey + '&user_id=' + userId +  '&page=' + $scope.main.page + '&per_page=6&extras=geo,url_o&format=json&jsoncallback=JSON_CALLBACK').success(function(response){

					 	$scope.loading = false;
					 	$scope.navi = true;
					
						$scope.posts = response.photos.photo;
						$scope.main.pages = response.photos.pages;
					

					

						// Next Page navigation button method
						$scope.nextPage = function() {
                			if ($scope.main.page < $scope.main.pages) {
                    			$scope.main.page++;
                    
                    			$scope.getRecent();
                			}
            			};


   						// Previous Page navigation button method
            			$scope.previousPage = function() {
                			if ($scope.main.page > 1) {
                    			$scope.main.page--;
                    			$scope.getRecent();
                			}
            			};

					
				});
			};



		



			


			// Make angular request to get get Interesting photos
			$scope.getInteresting = function(){
				$scope.imgCont=true;

				$scope.loading = true;
				$scope.navi = false;
				
				$http.jsonp(base + 'flickr.interestingness.getList&api_key=' + apiKey + '&user_id=' + userId + '&page=' + $scope.main.page + '&per_page=6&extras=geo,url_o,owner_name,date_upload, date_taken,views,tags&format=json&jsoncallback=JSON_CALLBACK').success(function(response){

					 $scope.loading = false;
					 $scope.navi = true;
					
					$scope.posts = response.photos.photo;
					

					$scope.main.pages = response.photos.pages;

					// Next Page navigation button method
					$scope.nextPage = function() {
                		if ($scope.main.page < $scope.main.pages) {
                    		$scope.main.page++;
             
                    		$scope.getInteresting();
                		}
            		};
            


 					// Previous Page navigation button method
		            $scope.previousPage = function() {
        		        if ($scope.main.page > 1) {
                    		$scope.main.page--;
                    		$scope.getInteresting();
                		}
            		};
				});
			};



			// function to create a slide gallery when image is clicked
			$scope.gallery = function() {


				$scope.navi = false;
				$scope.slide=true;
				$scope.imgCont=false;
				for (var i =0; i < $scope.main.take; i++) {
						$scope.img = $scope.posts;
						
						$scope.photos = $scope.posts[i].url_o;


						// initial image index
					    $scope._Index = 0;
					    console.log($scope.photos.length);
					    $scope.imgNum=5;

					    // if a current image is the same as requested image
					    $scope.isActive = function (index) {
					        return $scope._Index === index;
					    };

					    // show prev image
					    $scope.showPrev = function () {
					        $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.imgNum - 1;
					    };

					    // show next image
					    $scope.showNext = function () {
					        $scope._Index = ($scope._Index < $scope.imgNum- 1) ? ++$scope._Index : 0;
					    };


					    // Close slide 
					    $scope.closeslide = function () {
					    	$scope.slide=false;
							$scope.imgCont=true;
							$scope.navi = true;
					    };


					    // show a certain image
					    $scope.showPhoto = function (index) {
					        $scope._Index = index;
					    };
					};	



			} 








	}]);

