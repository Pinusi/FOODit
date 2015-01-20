'use strict';

angular.module('jstestApp')
  .filter('filterTags', function () {
    return function (items, type) {
      var filtered = [];
      if( type === 'tags' ){
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          if ( item.substring(0, 7) !== '#course' ) {
            if( item.indexOf(':') !== -1)
            {
              filtered.push(item.substring(item.indexOf(':') + 1));
            }
            else
            {
              filtered.push(item);
            }
          }
        }
      }
      return filtered;
    };
  });