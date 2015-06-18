$.fn.masonry =  function(){
	return false;
}

var Echidna = (function(jq,self){

		self.halfContentSlide  = function(obj){
			if(!jq || typeof obj !== "object") return;
			var opt = jq.extend({
				triggerBtn : "",
				gridContainer : "",
				filterContainer : "",
				callback : "",
				item : ""
			},obj);
			var trigger = jq(opt.triggerBtn), container = jq(opt.gridContainer),filContainer = jq(opt.filterContainer), item = jq(opt.item);
			if(!trigger.length || !container.length || !filContainer.length) return;

			var init = function(){
				container.masonry({
				  itemSelector: opt.item
				});
			};

			trigger.on('click',function(){
				var tmp = jq(this);
				if(tmp.hasClass('active')) return;
				tmp.addClass('active');
				if(!filContainer.hasClass('active')){
					filContainer.toggleClass('active');
					if ($( window ).width()<450) {
						$('.overlay').css('display','none');
					};
					
					setTimeout(function(){   container.toggleClass('active').masonry();tmp.removeClass('active');},500);								
				}else{
					filContainer.toggleClass('active');
					if ($( window ).width()<450) {
						$('.overlay').css('display','block');
					}
					container.toggleClass('active').masonry();
					tmp.removeClass('active');
				}
			});

			init();
		};
		return self;
	})(jQuery, Echidna || {});


$(window).load(function(){
	/*$('#filter_btn').on('click',function(){
		/*var width=$("#grid_container").width();*/
		/*console.log($(".grid").hasClass("active"));
        if(!$("#grid_container").hasClass("active")){
          /*$(".overlay").fadeIn('fast');*/
          /*$('.overlay').css('display','block');
        }
        else{
         /* $('.overlay').fadeOut('fast');*/
         /* $('.overlay').css('display','none');
        }
        });*/
	Echidna.halfContentSlide({triggerBtn:"#filter_btn",filterContainer:"#filter_container",gridContainer:"#grid_container",item:"#grid_container .item"});
	/*$('#filter_btn').on('click',function(){
		/*var width=$("#grid_container").width();*/
		/*console.log($(".grid").hasClass("active"));
        if(!$("#grid_container").hasClass("active")){
          $(".overlay").fadeIn('fast');
          $('.overlay').css('display','block');
        }
        else{
         /* $('.overlay').fadeOut('fast');*/
         /* $('.overlay').css('display','none');
        }
        });*/
	$('#filter_container').height(window.innerHeight-$('.company_header').height()-$('.main_nav').height());
});



var App = angular.module('drag-and-drop', ['ngDragDrop', 'ngLodash']);

      App.controller('oneCtrl', function($scope, $timeout, lodash, $q) {
        $scope.products = [
            {
              'title': 'Lolcat Shirt',
              'Price' : '150',
              'image' : '',
              'id' : 1,
              'size' : ['s','m']
            },
            {
              'title': 'Cheezeburger Shirt',
              'Price' : '110',
              'image' : '',
              'id' : 2,
              'size' : []
            },
            {
              'title': 'Buckit Shirt',
              'Price' : '50',
              'image' : '',
              'id' : 3,
              'size' : ['l','xl']
            },
            {
              'title': 'Buckit Shirt 2',
              'Price' : '500',
              'image' : '',
              'id' : 4,
              'size' : ['l','xl']
            },
            {
              'title': 'Buckit Shirt 3',
              'Price' : '150',
              'image' : '',
              'id' : 5,
              'size' : ['l','xl']
            }
          ];
          console.log();
        $scope.cart = [];

        $scope.hideMe = function() {
          return $scope.cart.length > 0;
        }
        $scope.onDropFn = function(index){
          var deferred = $q.defer();
          if(lodash.findIndex($scope.cart,'id',$scope.cart[index].id) != -1){
            //console.log($scope.cart[index].id);
            deferred.reject();
            console.log($scope.cart);
          }
        };
        $scope.beforeDrop = function(index){
          	var deferred = $q.defer();
            var index = lodash.findIndex($scope.cart,'id',$scope.products[index].id);
        	if($scope.cart.length && index != -1){
            //console.log($scope.cart[index].id);
            $scope.cart[index].Quantity =  $scope.cart[index].Quantity + 1 || 2; 
            deferred.reject();
          	return deferred.promise;
          }
        };
        $scope.showQuanity = function(){
          var quantity = 0;
          for (var i = $scope.cart.length - 1; i >= 0; i--) {
            quantity = quantity + $scope.cart[i].Quantity || 1;
          };
          return quantity;
        } || 0;
    });