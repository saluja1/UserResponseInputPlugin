var viewportWidth = $(window).width();
var viewportHeight = $(window).height();
var protocolRef=0<=location.href.toLowerCase().indexOf("https")?"https:":"http:";

function createDialog(b, a) {
    var c = a ? $("#rootDiv" + a.primeKey) : $("#rootDiv");
    a || (a = {
        primeKey: 1
    });
    if (!$("#alertBox" + a.primeKey).length) {
        var d = $("<div>");
        d.prop({
            id: "alertBox" + a.primeKey
        });
        d.css({
            left: -1,
            top: -1,
            width: c.width() + 10,
            height: c.height() + 10,
            backgroundImage: "url(transparent.png)",
            position: "absolute",
            zIndex: 3E3
        });
        c.append(d);
        var e = $("<div>");
        e.prop({
            id: "alertBoxContent" + a.primeKey,
            align: "center"
        });
        e.css({
            width: 300,
            backgroundColor: "#eeeeee",
            borderTopWidth: 25,
            position: "absolute"
        });
        e.html("<br><b>" + b + "</b><br><br><br><input type='button' value='   OK   ' onclick='hideDialog(this)'/><br>&nbsp;");
        d.append(e);
        e.css({
            left: Math.round((c.width() - e.width()) / 2),
            top: Math.round((c.height() - e.height() - 25) / 2)
        });
        $(e).addClass("borderClass shadowClass")
    }
}

function hideDialog(b) {
    b.length ? b.remove() : $(b).parents("[id^=alertBox]").remove()
}
$.fn.UserResponseInputPlugin = function(URObj)
{	
	var _obj = 
	{
		nextBRef: ($("#forwardbutton").length)? "#forwardbutton" : ($("#nextButton").length)? "#nextButton" : "#btn_continue",
		primeKey: (isNaN(this.prop("id").charAt(this.prop("id").length - 1)))? "_" : this.prop("id").substr(3,4) + "_",
		okLabel: "   OK   ",
		Q30text: "And, If you could only access ONE of these apps, which one would you prefer to access?",
		errMsg1: "Please ensure the sum of your answers equals 100.",
		errMsg2: "Please be specific with your response in other specify box.",
		errMsg3: "Please provide your response consecutively.",
		errMsg4: "Please provide different options.", //Same other specify error
		errMsg5: "Please provide answer in Q30a.", //Same other specify error
		errMsg6: "Please provide similar answer in Q30a.", //Same other specify error
		pileArray: [1],
		cardArray: [],
		pileText: [], //Please pass the text in the same order of precodes passed to the pileArray parameter//
		cardText: [], //Please pass the text in the same order of precodes passed to the cardArray parameter//
		pileWidth: 550,
		pileHeight: 0,
		pileDistance: 5,
		scrollBarVisibleHeight: 35,
		cardWidth: 50,
		cardHeight: 22,
		buttonSize: 22,
		otherSpecify: [],
		posX: 0,
		posY: 1,
		dataArray: new Array(),
		oldViewportWidth: viewportWidth,
		run: true,
		totalQuantityRequired: 100,
		totalText: "",
		tableHeading: "",
		minOther: 1,
		openEndLimit: 9,
		OpenEndButtonText: "",
		exclusiveText: "",
		finishFlag: true,
		counter:1
	}
	$.extend(_obj, URObj);

	for (var i = 0; i < _obj.openEndLimit; i++) {
		_obj.cardArray.push(i+1);
		_obj.cardText.push(i+1);
		_obj.otherSpecify.push(i+1);

	};

	//_obj.cardWidth = viewportSize.getWidth() - 30 - (_obj.pileWidth * _obj.pileArray.length) - (_obj.pileDistance * (_obj.pileArray.length - 1));
	//_obj.cardWidth = (_obj.cardWidth > 300)? 300 : (_obj.cardWidth < 100)? 100 : _obj.cardWidth;
	_obj.posX = _obj.cardWidth;
	
	var rootDiv = $("<div>");
	rootDiv.prop({id: "rootDiv" + _obj.primeKey});
	rootDiv.css({position: "relative", width: 1, borderColor:"#999999"});
	rootDiv.addClass("borderClass");
	this.html("");
	this.append(rootDiv);

	document.body.ondragstart = function(){return false};
	$(document.body).on("selectstart", function(){return false});
	$(_obj.nextBRef).css({visibility: "visible", display: "inline"});
	$(_obj.nextBRef).on("click", submitHandler);

	if($("meta[name=viewport]").length && viewportWidth < (_obj.pileWidth + _obj.cardWidth) )
	{
		$("meta[name=viewport]").prop('content', 'width=' + (_obj.pileWidth + _obj.cardWidth + 20));
	}

	createPiles();

	function createPiles()
	{
		var pile;

		if (_obj.tableHeading != "") {
			var tableHeading = $("<div>");
			tableHeading.prop({id: "tableHeading" + _obj.primeKey, align: "center"});
			tableHeading.css({width: _obj.cardWidth-5, position: "absolute", left: -1, top: _obj.posY, cursor: "default", padding: 10, border: "1px solid #999999"});
			tableHeading.html("<b>"+ _obj.tableHeading +"</b>");
			tableHeading.data({pilePosX: _obj.posX});
			$("#rootDiv" + _obj.primeKey).append(tableHeading).css({marginTop: tableHeading.outerHeight()});
			tableHeading.css({top: - tableHeading.outerHeight()});	
		};

		var cardHeading = $("<div>");
		cardHeading.prop({id: "cardHeading" + _obj.primeKey});
		cardHeading.css({width: _obj.cardWidth-5, position: "absolute", left: 10, top: _obj.posY+2, cursor: "default", lineHeight: "22px"});
		cardHeading.html("<b>"+ _obj.pileText[0] +"</b>");
		cardHeading.data({pilePosX: _obj.posX});
		$("#rootDiv" + _obj.primeKey).append(cardHeading);

		for(var i = 0; i < _obj.pileArray.length; i++)
		{
			pile = $("<div>");
			pile.prop({id: "pile" + _obj.primeKey + _obj.pileArray[i], align: "center"});
			pile.css({width: _obj.pileWidth, position: "absolute", left: _obj.posX, top: _obj.posY, cursor: "default"});
			pile.html("<b>" + _obj.pileText[i+1] + "</b>");
			pile.data({pilePosX: _obj.posX});
			$("#rootDiv" + _obj.primeKey).append(pile);
			_obj.pileHeight = (pile.height() > _obj.pileHeight)? pile.height() + 10 : _obj.pileHeight;

			if (i == 0) {
				pile.html("");
			};


			var pileLine = $("<div>");
			pileLine.prop({id: "pileLine" + _obj.primeKey + _obj.pileArray[i]});
			pileLine.css({width: 1, height: _obj.pileHeight, backgroundColor: "#999999", position: "absolute", left: _obj.posX, top: 0});
			$("#rootDiv" + _obj.primeKey).append(pileLine);

			_obj.posX += _obj.pileWidth + _obj.pileDistance;
		}

		var topLine = $("<div>");
		topLine.prop({id: "topLine" + _obj.primeKey});
		topLine.css({width: _obj.pileWidth + _obj.cardWidth, height: 4, backgroundColor: "#037CAF", position: "absolute", left: 0, top: _obj.posY + _obj.pileHeight});
		$("#rootDiv" + _obj.primeKey).append(topLine);

		var cardScrollbarComp = $("<div>");
		cardScrollbarComp.prop({id: "cardScrollbarComp" + _obj.primeKey});
		cardScrollbarComp.css({width: _obj.pileWidth + _obj.cardWidth, height: _obj.scrollBarVisibleHeight, position: "absolute", left: 0, top: _obj.posY + _obj.pileHeight + 4, overflow : "hidden"});

		cardScrollbarComp.attr({"data-height": _obj.scrollBarVisibleHeight});

		$("#rootDiv" + _obj.primeKey).append(cardScrollbarComp);

		_obj.posX = 0;
		_obj.posY = 0;
		
		createCards();
	}

	function createCards()
	{
		var card;
		var cardContent;
		var actualHeight;
		var total;
		var dot;
		var hLine;
		var openEndBox;
		var exclusiveLabel, exclusive;

		for(var i = 0; i < _obj.cardArray.length; i++)
		{
			_obj.dataArray.push(-999);
			
			card = $("<div>");
			card.prop({id: "card" + _obj.primeKey + _obj.cardArray[i], align: "left"});
			card.css({width: $("#topLine" + _obj.primeKey).width(), position: "absolute", left: _obj.posX, top: _obj.posY, cursor: "default", borderBottom:"1px solid #999999"});
			$("#cardScrollbarComp" + _obj.primeKey).append(card);

			cardContent = $("<div>");
			cardContent.prop({id: "cardContent" + _obj.primeKey + _obj.cardArray[i], align: "left"});
			cardContent.html(_obj.cardText[i]);
			cardContent.css({position: "absolute", fontSize: 14 + "px", width: 20, left: 20, top: _obj.cardHeight/2});
			card.append(cardContent);


			if($.inArray(_obj.cardArray[i], _obj.otherSpecify) != -1)
			{
				cardContent.css({minWidth: _obj.cardWidth - 105, maxWidth: _obj.cardWidth - 105});
				openEndBox = $("<input>");
				openEndBox.prop({id: "openEnd" + _obj.primeKey + _obj.cardArray[i], type: "text", autocomplete: "off", tabindex: -1});
				openEndBox.css({fontFamily: "Arial", fontSize: 13 + "px", width: _obj.pileWidth -20, height: 20, position: "absolute", left: _obj.cardWidth + 5, top:_obj.cardHeight/2-5, borderRadius: 5,border: "1px solid #999999", boxShadow: "0px 1px 1px #a7a7a7 inset", outline: "none", padding: "2px 5px"});
				card.append(openEndBox);
				card.data({hasOE: true});

				openEndBox.on("keyup", keysHandler);
				openEndBox.on("paste", function(pEvent){pEvent.preventDefault()});
				//openEndBox.on("kewdown", function(pEvent){ if(pEvent.keyCode == 9) {pEvent.preventDefault()}});
			}

			card.css({height: cardContent.height() + _obj.cardHeight});
			card.data({heightRef: cardContent.height() + _obj.cardHeight, cardPosX: _obj.posX, cardPosY: _obj.posY});

			_obj.posY += card.outerHeight();
		}

		var bottomLine = $("<div>");
		bottomLine.prop({id: "bottomLine" + _obj.primeKey});
		bottomLine.css({width: $("#topLine" + _obj.primeKey).width(), height: 4, backgroundColor: "#037CAF", position: "absolute", left: 0, bottom: 176});
		$("#rootDiv" + _obj.primeKey).append(bottomLine);

		$("#rootDiv" + _obj.primeKey).css({width: bottomLine.width() + 0, height: $("#cardScrollbarComp" + _obj.primeKey).position().top + _obj.pileHeight + 130});

		OpenEndButton = $("<div>");
		OpenEndButton.prop({id: "OpenEndButton" + _obj.primeKey, align: "center"});
		OpenEndButton.css({ position: "absolute", width: $("#rootDiv" + _obj.primeKey).width()-35, height: 20, left: 10, bottom: 136, fontWeight: "bold", lineHeight: "22px", cursor: "pointer", padding: 5, border: "1px solid #999999", borderRadius: 5});
		OpenEndButton.html(_obj.OpenEndButtonText)
		$("#rootDiv" + _obj.primeKey).append(OpenEndButton);
		OpenEndButton.on("click", openEndShowHandler);

		exclusiveLabel = $("<label>");
		exclusiveLabel.prop({id: "exclusiveLabel" + _obj.primeKey, align:"left", htmlFor: "exclusive" + _obj.primeKey});
		exclusiveLabel.css({ position: "absolute", width: $("#rootDiv" + _obj.primeKey).width()-35, height: _obj.buttonSize, left: 5, bottom: 101, fontWeight: "bold", paddingLeft: 25, lineHeight: "24px", cursor: "pointer"});
		exclusiveLabel.html(_obj.exclusiveText)
		$("#rootDiv" + _obj.primeKey).append(exclusiveLabel);

		exclusive = $("<input>");
		exclusive.prop({id: "exclusive" + _obj.primeKey, type: "radio"});
		exclusive.css({textAlign: "center", position: "absolute", width: 20, height: 20, left: 0, top: 2, margin:0, outline: "none", cursor: "pointer"});
		exclusiveLabel.append(exclusive);
		exclusive.on("click", exclusiveHandler);

		cardQ30 = $("<div>");
		cardQ30.prop({id: "cardQ30" + _obj.primeKey, align: "left"});
		cardQ30.css({ position: "absolute", width: $("#rootDiv" + _obj.primeKey).width()-35, height: 20, left: 10, bottom: 10, fontWeight: "bold", lineHeight: "22px", cursor: "pointer", padding: 5, display: 'none'});
		$("#rootDiv" + _obj.primeKey).append(cardQ30);

		cardContentQ30 = $("<div>");
		cardContentQ30.prop({id: "cardContentQ30" + _obj.primeKey, align: "left"});
		cardContentQ30.css({ position: "absolute", width: $("#rootDiv" + _obj.primeKey).width()-35, height: 20, left: 10, bottom: 30, fontWeight: "bold", lineHeight: "22px", cursor: "pointer", padding: 5});
		cardContentQ30.html(_obj.Q30text);
		cardQ30.append(cardContentQ30);

		openEndBoxQ30 = $("<input>");
		openEndBoxQ30.prop({id: "openEndQ30" + _obj.primeKey, type: "text", autocomplete: "off", tabindex: -1});
		openEndBoxQ30.css({fontFamily: "Arial", fontSize: 13 + "px", width: _obj.pileWidth -20, height: 20, position: "absolute", left: 10, top:_obj.cardHeight/2-5, borderRadius: 5,border: "1px solid #999999", boxShadow: "0px 1px 1px #a7a7a7 inset", outline: "none", padding: "2px 5px"});
		cardQ30.append(openEndBoxQ30);
		openEndBoxQ30.on("keyup", keysHandler);
		openEndBoxQ30.on("paste", function(pEvent){pEvent.preventDefault()});

		$("#rootDiv" + _obj.primeKey).css({width: bottomLine.width(), height: 6*_obj.pileHeight+100});
		$("#pileLine" + _obj.primeKey + 1).css({height: 3*_obj.pileHeight-5});
	}

	function openEndShowHandler(pEvent){
		var cardHeight=$("#card"+_obj.primeKey+_obj.counter).outerHeight();

		for (var i = 0; i < _obj.counter; i++) {
			if ($("#openEnd"+_obj.primeKey+_obj.cardArray[i]).val() == "") {
				createDialog(_obj.errMsg2, _obj);
				$("#alertBoxContent" + _obj.primeKey).children().eq(5).prop("value", _obj.okLabel);
				return false;
			};
		};

		if (_obj.counter != _obj.openEndLimit) {
			_obj.counter++;
			$("#cardScrollbarComp"+_obj.primeKey).animate({height: $("#cardScrollbarComp"+_obj.primeKey).height() + cardHeight});
			$("#rootDiv"+_obj.primeKey).animate({height: $("#rootDiv" + _obj.primeKey).height() + cardHeight});
			$("#pileLine" + _obj.primeKey + 1).animate({height: $("#bottomLine" + _obj.primeKey).position().top+40});
			
			if (_obj.counter == _obj.openEndLimit) {
				$("#OpenEndButton"+_obj.primeKey).fadeOut(0);
			};
		}
	}

	function exclusiveHandler(pEvent){
		var ref = $(pEvent.currentTarget);

		ref.prop("checked", true);
		_obj.counter=1;
		$("#OpenEndButton"+_obj.primeKey).fadeIn();
		$("#cardScrollbarComp"+_obj.primeKey).animate({height: _obj.scrollBarVisibleHeight});
		$("#rootDiv" + _obj.primeKey).animate({height: 6*_obj.pileHeight+100});
		$("#pileLine" + _obj.primeKey + 1).animate({height: 3*_obj.pileHeight-5});
		for (var i = 0; i < _obj.cardArray.length; i++) {
			$("#openEnd"+_obj.primeKey+_obj.cardArray[i]).val("");
		};
		$("#cardQ30_").hide(100);
		$("#openEndQ30"+_obj.primeKey).val("");
	}

	function keysHandler(pEvent)
	{
		var ref = $(pEvent.currentTarget);
		var refId = ref.prop("id").substr(ref.prop("id").indexOf("_") + 1, 8);
		$("#exclusive"+_obj.primeKey).prop("checked", false);
		var str = "";
		var flag = true;
		if(pEvent.keyCode == 32)
		{
			if(ref.prop("value").charAt(0) == " ")
			{
				ref.prop({value: ""});
			}
			for(var i = 0; i < ref.prop("value").length; i++)
			{
				if(ref.prop("value").charAt(i) == " ")
				{
					if(flag)
					{
						str += ref.prop("value").charAt(i);
					}
					flag = false;
				}
				else
				{
					flag = true;
				}
				if(flag)
				{
					str += ref.prop("value").charAt(i);
				}
			}
			ref.prop({value: str});
		}
		if ($("#openEnd_2").val().length > 0) {
			$("#cardQ30_").show(250);
		} else {
			$("#cardQ30_").hide(100);
			$("#openEndQ30"+_obj.primeKey).val("");
		}
	}

	function submitHandler()
	{
		var i,j,str,target,targetVal,tempArray,otherData=[], minimumCounter=0;

		if ($("#exclusive"+_obj.primeKey).prop("checked")) {
			otherData.push(999);
		}
		else
		{
			for(i = 0; i < _obj.cardArray.length; i++)
			{
				target = $("#openEnd"+_obj.primeKey+_obj.cardArray[i]);
				targetVal = $.trim(target.val());
				target.val(targetVal);

				if(targetVal != "")
				{
					minimumCounter++;
					for (var j = 0; j < otherData.length; j++) {
						if (otherData[j] == targetVal) {
							createDialog(_obj.errMsg4, _obj);
							$("#alertBoxContent" + _obj.primeKey).children().eq(5).prop("value", _obj.okLabel);
							return false;
						};
					};
				}

				if (i < _obj.counter-1 && target.val() == "" && $("#openEnd"+_obj.primeKey+_obj.cardArray[i+1]).val() != "") {
					createDialog(_obj.errMsg3, _obj);
					$("#alertBoxContent" + _obj.primeKey).children().eq(5).prop("value", _obj.okLabel);
					return false;
				};

				otherData.push(target.val());
			}

			if (minimumCounter < _obj.minOther ) {
				createDialog(_obj.errMsg1, _obj);
				$("#alertBoxContent" + _obj.primeKey).children().eq(5).prop("value", _obj.okLabel);
				return false;
			};
		};

		var Q30value = "";

		if (!$("#exclusive"+_obj.primeKey).prop("checked") && $("#openEnd_2").val().length > 0) {

			Q30value = $("#openEndQ30_").val();
			if ( Q30value.length > 0) {
				if (otherData.indexOf(Q30value) == -1) {
					createDialog(_obj.errMsg6, _obj);
					$("#alertBoxContent" + _obj.primeKey).children().eq(5).prop("value", _obj.okLabel);
					return false;							
				}
			} else {
				createDialog(_obj.errMsg5, _obj);
				$("#alertBoxContent" + _obj.primeKey).children().eq(5).prop("value", _obj.okLabel);
				return false;			
			}
		}

		if(_obj.finishFlag)
		{
			_obj.finishFlag = false;
			window["setValue" + _obj.primeKey.slice(0,-1)](otherData.join(",~,"), Q30value);
		}
	}
}