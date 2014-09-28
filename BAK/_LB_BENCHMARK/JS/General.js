// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

var benchmarkingTimer;
var timeSumLB = 0;
var timeSumNT = 0;
var timeAverageDenominator = 0;
var valueMaximumLB = 0;
var valueMaximumNT = 0;
var valueMinimumLB = 1000000000;
var valueMinimumNT = 1000000000;
var timeDateThatStarted = 0;
var timeDateThatTerminated = 0;
var blockBenchmarking = false;
$(document).ready(function(){
	
});


//Note: ! By Questor
function GetTime() 
{
	var d = new Date();
	return d.getTime();
}


//Note: ! By Questor
function Validate()
{
	
	var ValidateOutPut = true;
	
	if($("#fieldServer").val() == "")
	{
		PutRemoveWarningWithInput($("#fieldServer"), "fieldServer", "Inform the Server!", false);
		ValidateOutPut = false;
	}
	else
	{
		PutRemoveWarningWithInput(null, "fieldServer", "", true);
	}
	
	if($("#fieldUDB").val() == "")
	{
		PutRemoveWarningWithInput($("#fieldUDB"), "fieldUDB", "Inform the UDB!", false);
		ValidateOutPut = false;
	}
	else
	{
		PutRemoveWarningWithInput(null, "fieldUDB", "", true);
	}
	
	if($("#fieldBase").val() == "")
	{
		PutRemoveWarningWithInput($("#fieldBase"), "fieldBase", "Inform the Base!", false);
		ValidateOutPut = false;
	}
	else
	{
		PutRemoveWarningWithInput(null, "fieldBase", "", true);
	}
	
	if($("#fieldUser").val() == "")
	{
		PutRemoveWarningWithInput($("#fieldUser"), "fieldUser", "Inform the User!", false);
		ValidateOutPut = false;
	}
	else
	{
		PutRemoveWarningWithInput(null, "fieldUser", "", true);
	}
	
	if($("#fieldPassword").val() == "")
	{
		PutRemoveWarningWithInput($("#fieldPassword"), "fieldPassword", "Inform the Password!", false);
		ValidateOutPut = false;
	}
	else
	{
		PutRemoveWarningWithInput(null, "fieldPassword", "", true);
	}
	
	if($("#fieldQueryTest").val() == "")
	{
		PutRemoveWarningWithInput($("#fieldQueryTest"), "fieldQueryTest", "Inform the Query Test!", false);
		ValidateOutPut = false;
	}
	else
	{
		PutRemoveWarningWithInput(null, "fieldQueryTest", "", true);
	}
	
	if($("#fieldCycleTime").val() == "")
	{
		PutRemoveWarningWithInput($("#fieldCycleTime"), "fieldCycleTime", "Inform the Cycle Time!", false);
		ValidateOutPut = false;
	}
	else
	{
		PutRemoveWarningWithInput(null, "fieldCycleTime", "", true);
	}
	
	return ValidateOutPut;
	
}


//Note: Coloca ou remove avisos de validação! By Questor
function PutRemoveWarningWithInput(objectInstanceMenssagePosition, fieldNameOrId, message ,remove)
{
	if(!remove && $("#warning_" + fieldNameOrId).length == 0)
	{
		$(objectInstanceMenssagePosition).parent().after("<div id=\"warning_" + fieldNameOrId + "\" class=\"divBox coluna texto texto4 texto5\" style=\"display:inline;margin-left:5px;color:F8C300;\">[!] " + message + "</div>");
	}
	
	if(remove && $("#warning_" + fieldNameOrId).length != 0)
	{
		$("#warning_" + fieldNameOrId).remove();
	}
}


//Note: ! By Questor
function Start_Benchmarking()
{
	if(!blockBenchmarking)
	{
		if(timeDateThatStarted == 0)
		{
			if(!Validate())
			{
				return;
			}
			else
			{
				$("div[name^=\"benchmarkLine\"]").remove();
				$("#buttonStartBenchmarking").attr("disabled", "disabled");
			}
		}
		
		if(timeDateThatStarted == 0)
		{
			timeDateThatStarted = moment().format();
			$("#timeDateThatStarted").text(timeDateThatStarted);
			$("#timeDateThatTerminated").text("");
			$("#timeDateElapsed").text("");
			$("#benchmarkOutPutLB").val("");
			$("#benchmarkOutPutNT").val("");
			$("#timeAverageNowLB").text("");
			$("#timeAverageNowNT").text("");
			$("#valueMaximumLB").text("");
			$("#valueMaximumNT").text("");
			$("#valueMinimumLB").text("");
			$("#valueMinimumNT").text("");
		}
	Benchmarking();
	}
	benchmarkingTimer = setTimeout("Start_Benchmarking();", parseInt($("#fieldCycleTime").val()));
}


//Note: ! By Questor
function Stop_Benchmarking()
{
	if(benchmarkingTimer)
	{
    	clearTimeout(benchmarkingTimer);
		timeDateThatTerminated = moment().format();
		$("#timeDateThatTerminated").text(timeDateThatTerminated);
		$("#timeDateElapsed").text(moment(timeDateThatStarted, "YYYY-MM-DDThh:mm:ssTZD").fromNow());
		DefineMaximumMinimum();
	    benchmarkingTimer = 0;
	    timeSumLB = 0;
	    timeSumNT = 0;
		timeAverageDenominator = 0;
		valueMaximumLB = 0;
		valueMaximumNT = 0;
		valueMinimumLB = 1000000000;
		valueMinimumNT = 1000000000;
		timeDateThatStarted = 0;
		timeDateThatTerminated = 0;
		blockBenchmarking = false;
		$("#buttonStartBenchmarking").removeAttr("disabled");
	}
}


//Note: ! By Questor
function Benchmarking()
{
	
	var startTime
	var endTime
	var benchmarkingResultNow
	var benchmarkingOutPut = true;
	var benchmarkingError = true;
	
	blockBenchmarking = true;
	startTime = GetTime();
	try
	{
		
		$.ajax({
			type: "POST",
			url: "./ASP/LB_Benchmarking.asp",
			data: "fieldServer=" + escape($("#fieldServer").val()) + "&fieldUDB=" + escape($("#fieldUDB").val()) + "&fieldBase=" + escape($("#fieldBase").val()) + "&fieldUser=" + escape($("#fieldUser").val()) + "&fieldPassword=" + escape($("#fieldPassword").val()) + "&fieldQueryTest=" + escape($("#fieldQueryTest").val()),
			dataType: "HTML",
			async: true,
			success: function(result)
			{
				if(result.search("ASP_ERROR_COD") == -1)
				{
					endTime = GetTime();
					benchmarkingResultNow = result + "$" + (parseInt(endTime) - parseInt(startTime) - parseInt(result.split("$")[1]));
					benchmarkingError = false;
				}
				else
				{
					benchmarkingResultNow = result.replace("ASP_ERROR_COD", "");
				}
				CreateReport(benchmarkingResultNow, benchmarkingError);
			},
			error: function(parametro, ajaxOptions, err)
			{
				benchmarkingResultNow = "Error! Houve um erro na verificação desse benchmark! Descrição: \"" + err.description + "\". Opções Ajax: \"" + ajaxOptions + "\".";
				CreateReport(benchmarkingResultNow, benchmarkingError);
			}
		});
		
	}
	catch(err)
	{
		benchmarkingResultNow = "Error! Ocorreu um erro na verificação desse benchmark! Descrição: \"" + err.description + "\".";
		CreateReport(benchmarkingResultNow, benchmarkingError);
	}
	
	return benchmarkingOutPut;
	
}


//Note: ! By Questor
function CreateReport(createReportInput, benchmarkingError)
{
	blockBenchmarking = false;
	if(!benchmarkingError)
	{
		
		var timeAverageNowLB = 0;
		var timeAverageNowNT = 0;
		
		timeAverageDenominator++;
		
		timeSumLB = parseInt(timeSumLB) + parseInt(createReportInput.split("$")[0]);
		timeSumNT = parseInt(timeSumNT) + parseInt(createReportInput.split("$")[1]);
		
		timeAverageNowLB = parseInt(timeSumLB) / parseInt(timeAverageDenominator);
		timeAverageNowNT = parseInt(timeSumNT) / parseInt(timeAverageDenominator);
		
		//LB
		$("#timeAverageNowLB").text(timeAverageNowLB + " ms");
		
		if(parseInt(createReportInput.split("$")[0]) > parseInt(valueMaximumLB))
		{
			$("#valueMaximumLB").text(createReportInput.split("$")[0] + " ms at " + moment().format());
			valueMaximumLB = createReportInput.split("$")[0];
		}
		if(parseInt(createReportInput.split("$")[0]) < parseInt(valueMinimumLB))
		{
			$("#valueMinimumLB").text(createReportInput.split("$")[0] + " ms at " + moment().format());
			valueMinimumLB = createReportInput.split("$")[0];
		}
		
		//NT
		$("#timeAverageNowNT").text(timeAverageNowNT + " ms");
		
		if(parseInt(createReportInput.split("$")[1]) > parseInt(valueMaximumNT))
		{
			$("#valueMaximumNT").text(createReportInput.split("$")[1] + " ms at " + moment().format());
			valueMaximumNT = createReportInput.split("$")[1];
		}
		if(parseInt(createReportInput.split("$")[1]) < parseInt(valueMinimumNT))
		{
			$("#valueMinimumNT").text(createReportInput.split("$")[1] + " ms at " + moment().format());
			valueMinimumNT = createReportInput.split("$")[1];
		}
		
		//LB
		var titleLB = "[" + createReportInput.split("$")[0] + " ms at [" + moment().format() + "]";
		$("#benchmarkOutPutDivLB").append("<div name=\"benchmarkLineLB\" title=\"" + titleLB + "\" class=\"linha gfxDiv gfxDiv1\" style=\"width:" + createReportInput.split("$")[0] + "px;\"></div>");
		
		//NT
		var titleNT = "[" + createReportInput.split("$")[1] + " ms at [" + moment().format() + "]";
		$("#benchmarkOutPutDivNT").append("<div name=\"benchmarkLineNT\" title=\"" + titleNT + "\" class=\"linha gfxDiv gfxDiv2\" style=\"width:" + createReportInput.split("$")[1] + "px;\"></div>");
		
	}
	else
	{
		$("#benchmarkOutPutDivLB").append("<div name=\"benchmarkLineLB\" title=\"At [" + moment().format() + "]\" class=\"linha gfxDiv3\">" + createReportInput + "</div>");
		$("#benchmarkOutPutDivNT").append("<div name=\"benchmarkLineNT\" title=\"At [" + moment().format() + "]\" class=\"linha gfxDiv3\">" + createReportInput + "</div>");
	}
	
	if(($(document).height() - ($(window).scrollTop() + $(window).height())) <= 4)
	{
		$('body').animate({
                scrollTop:$(document).height()-$(window).height()
        },
        0);
	}
	
}

function pad(width, string, padding)
{
	return (width <= string.length) ? string : pad(width, string + padding, padding)
}

function DefineMaximumMinimum()
{
	
	var benchmarkLineLBArray = $("div[name=\"benchmarkLineLB\"]");
	
	$.each(benchmarkLineLBArray, function(index, value)
	{
		if($(benchmarkLineLBArray[index]).css("width") == "" + valueMaximumLB + "px")
		{				
			$(benchmarkLineLBArray[index]).css({"background-color":"#F8C300", "height":"5px;"});
		}
	});
	
	var benchmarkLineNTArray = $("div[name=\"benchmarkLineNT\"]");
	
	$.each(benchmarkLineNTArray, function(index, value)
	{
		if($(benchmarkLineNTArray[index]).css("width") == "" + valueMaximumNT + "px")
		{				
			$(benchmarkLineNTArray[index]).css({"background-color":"#F8C300", "height":"5px;"});
		}
	});
	
}


//Note: Exibe em popup informações sobre o primeiro objeto de um array de objetos localizados retornado por um busca JQuery! Útil para debug! By Questor
function ShowTagInformations(itemFounded)
{

	var attrs = itemFounded[0].attributes;
	var attrsLength = attrs.length;
	
	var attributeInformations = "* tag name: \n" + itemFounded[0].tagName + "\n\n" + "* attributes: \n";
	
	for(i = 0; i < attrsLength; ++i){
	
		attributeInformations = attributeInformations + attrs.item(i).nodeName + "=" + $(itemFounded[0]).attr(attrs.item(i).nodeName) + "\n";
		
	}
	
	attributeInformations = attributeInformations + "\nHTML full tag: \n" + $(itemFounded[0]).clone().wrap('<select>').parent().html();
	
	alert(attributeInformations);

}
