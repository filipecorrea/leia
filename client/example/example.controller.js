angular.module('myApp')
.controller('exampleController', function ($scope, $rootScope, $timeout, $window) {

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

  $scope.title = "Capitães da Areia";
  $scope.text = "A voz o chama. Uma voz que o alegra, que faz bater seu coração. Ajuda a mudar o destino de todos os pobres. Uma voz que atravessa a cidade, que parece vir dos atabaques que ressoam nas macumbas da religião ilegal dos negros. Uma voz que vem com o ruído dos bondes onde vão os condutores e motoneiros grevistas. Uma voz que vem do cais, do peito dos estivadores, de João de Adão, de seu pai morrendo num comício, dos marinheiros dos navios, dos saveiristas e dos canoeiros. Uma voz que vem do grupo que joga a luta da capoeira, que vem dos golpes que o Querido de Deus aplica. Uma voz que vem mesmo do Padre José Pedro, padre pobre de olhos espantados diante do destino terrível dos Capitães de Areia. Uma voz que vem das  lhas de santo do candomblé de Don'Aninha, na noite que a polícia levou Ogum. Voz que vem do Trapiche dos Capitães de Areia. Que vem do reformatório e do orfanato. Que vem do ódio do Sem-Pernas se atirando do elevador para não se entregar. Que vem no trem da Leste Brasileira, através do sertão, do grupo de Lampião pedindo justiça para os sertanejos. Que vem de Alberto, o estudante pedindo escolas e liberdade para a cultura. Que vem dos quadros de Professor, onde meninos esfarrapados lutam naquela exposição da rua Chile. Que vem de Boa-Vida e dos malandros da cidade, do bojo dos seus violões, dos sambas tristes que eles cantam. Uma voz que diz uma palavra bonita de solidariedade, de amizade: companheiros. Uma voz que convida para a festa da luta. Que é como um samba alegre de negro, como ressoar dos atabaques nas macumbas. Voz que vem da lembrança de Dora, valente lutadora. Voz que chama Pedro Bala. Como a voz de Deus chamava Pirulito, a voz do ódio o Sem-Pernas, como a voz dos sertanejos chamava Volta-Seca para o grupo de Lampião. Voz poderosa como nenhuma outra. Porque é uma voz que chama para lutar por todos, pelo destino de todos, sem exceção. Voz poderosa como nenhuma outra. Voz que atravessa a cidade e vem de todos os lados. Voz que traz com ela uma festa, que faz o inverno acabar lá fora e ser primavera. A primavera da luta. Voz que chama Pedro Bala, que o leva para a luta. Voz que vem de todos os peitos esfomeados da cidade, de todos os peitos explorados da cidade. Voz que traz o bem maior do mundo, bem que é igual ao sol, mesmo maior que o sol: a liberdade. A cidade no dia de primavera é deslumbradoramente bela. Uma voz de mulher canta a canção da Bahia. Cidade negra e velha, sinos de igreja, ruas calçadas de pedra. Canção da Bahia que uma mulher canta. Dentro de Pedro Bala uma voz o chama: voz que traz para a canção da Bahia, a canção da liberdade. Voz poderosa que o chama. Voz de toda a cidade pobre da Bahia, voz da liberdade.\n\nA revolução chama Pedro Bala.\n";

  checkSentencesComplexity();

  calculateData($scope.text);

  fleschKincaidEase();

});
