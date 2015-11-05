angular.module('myApp')
.controller('editorController', function ($scope, $rootScope, $timeout, $window) {

  angular.element($window).bind('resize', function(){
    setMarkerWidth();
  });

  $scope.textChanged = function(event) {

    removeInvalidContent();

    checkSentencesComplexity();

    if ($scope.text) {
      calculateData($scope.text);

      fleschKincaidEase();
    }
  };

  var setMarkerWidth = function() {
    // Set marker width based on text width
    document.getElementById("text").style.width = document.getElementById("marker").offsetWidth + "px";
    document.getElementById("marker").style.height = document.getElementById("text").offsetHeight + "px";
  };

  var removeInvalidContent = function() {

    // Remove multiple spaces
    //$scope.text = $scope.text.replace(/  +/g, ' ');
    // TODO: Breaks when "       Lorem"

    // Remove tags
    $scope.text = $scope.text.replace(/(<([^>]+)>)/ig, '');
    // TODO: Breaks when "<aaaaaaaaaaa"

  };

  var checkSentencesComplexity = function() {
    $scope.highlight = "";

    var SENT_REGEX = /[^\r\n.!?]+(:?(:?\r\n|[\r\n]|[.!?])+|$)/gi;
    var sentences = $scope.text.match(SENT_REGEX);

    $scope.hardSentencesCount = 0;
    $scope.veryHardSentencesCount = 0;

    if (sentences) {
      for (var i = 0; i < sentences.length; i++) {
        if (sentences[i].length >= 140) {
          $scope.veryHardSentencesCount += 1;
          $scope.highlight += "<span class='error'>" + sentences[i] + "</span>";
        } else if (sentences[i].length >= 100) {
          $scope.hardSentencesCount += 1;
          $scope.highlight += "<span class='warning'>" + sentences[i] + "</span>";
        } else {
          $scope.highlight += sentences[i];
        }
    	}
    }

    setMarkerWidth();
  };

  var calculateData = function(text) {
    $scope.wordsCount = 0;
    $scope.syllablesCount = 0;
    $scope.sentencesCount = 0;

    // Count sentences
    var SENT_REGEX = /[^\r\n.!?]+(:?(:?\r\n|[\r\n]|[.!?])+|$)/gi;
    $scope.sentencesCount = text.match(SENT_REGEX).length;

    // Count words
    var words = text.replace(/[^\w\s]/ig, "").split(" ");
    $scope.wordsCount = words.length;

    // Count syllables
    for (var i = 0; i < words.length; i++) {
  		$scope.syllablesCount += countSyllables(words[i].toLowerCase());
  	}
  };

  var countSyllables = function(word) {
    if(word.length <= 3) {
      return 1;
    }

    word = word.replace(/\d/gi, '');
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');

    var result =  word.match(/[aeiouy]{1,2}/g);

    if (result) {
      return result.length;
    }

  	return 0;
  };

  var fleschKincaidEase = function() {
    $scope.readabilityIndex = 206.835 - 1.015 * ($scope.wordsCount / $scope.sentencesCount) - 84.6 * ($scope.syllablesCount / $scope.wordsCount);
  	// console.log("Flesch Kincaid Reading Ease: " + $scope.readabilityIndex);

    calculateLevel($scope.readabilityIndex);
  };

  var calculateLevel = function(index) {
    if (index < 25) {
      $scope.level = 'Muito difícil';
      $scope.grade = 'Ensino Superior';
  		// document.getElementById('navbar').style.background = '#CD5C5C';
  	} else if (index < 50) {
      $scope.level = 'Difícil';
      $scope.grade = 'Ensino Médio';
  		// document.getElementById('navbar').style.background = '#DB7093';
  	} else if (index < 75) {
      $scope.level = 'Fácil';
      $scope.grade = '5º ao 9º ano do Ensino Fundamental';
  		// document.getElementById('navbar').style.background = '#FFA500';
  	} else {
      $scope.level = 'Muito fácil';
      $scope.grade = '1º ao 4º ano do Ensino Fundamental';
  		// document.getElementById('navbar').style.background = '#66CDAA';
  	}
  };

});
