angular.module('directivePractice').directive('lessonHider', function() {
	return {
		templateUrl: "lessonHider.html",
		restrict: 'E',
		scope: {
			lesson: '=',
			dayAlert: '&'
		},
		
		controller: function($scope, lessonService) {
			$scope.getSchedule = lessonService.getSchedule()
		},
		
		link: function(scope, element, attributes) {
			scope.getSchedule.then(function(response) {
				scope.schedule = response.data;

				scope.schedule.forEach(function(scheduleDay) {
			          if (scheduleDay.lesson === scope.lesson) {
				          	scope.lessonDay = scheduleDay.weekday;
				          	scope.checked = true;
				        	if (scope.checked) {
				        		element.css('text-decoration', 'line-through')
				        	}
				           return;
	         			}
	        		});
			})

			// not sure why I had to do this backwards
			scope.toggleChecked = function() {
				if (scope.checked) {
					// element.css('text-decoration', 'line-through')
					element.css('text-decoration', 'none')
				} 
				else {
					// element.css('text-decoration', 'none')
					element.css('text-decoration', 'line-through')
				}
			}

			scope.remove = function() {
				element.remove();
			}

		}
			
	}
})