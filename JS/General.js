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
var defineMaximumMinimumTimer;
var timeSumLB = 0;
var timeSumNT = 0;
var timeAverageDenominator = 0;
var timeAverageNowLB = 0;
var timeAverageNowNT = 0;
var valueMaximumLB = 0;
var valueMaximumNT = 0;
var valueMinimumLB = 1000000000;
var valueMinimumNT = 1000000000;
var timeDateThatStarted = 0;
var timeDateThatTerminated = 0;
var blockBenchmarking = false;
var stopBenchmarking = false;

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
	
	if($("#fieldCycleTime").val() == "")
	{
		PutRemoveWarningWithInput($("#fieldCycleTime"), "fieldCycleTime", "Inform the Cycle Time!", false);
		ValidateOutPut = false;
	}
	else
	{
		PutRemoveWarningWithInput(null, "fieldCycleTime", "", true);
	}
	
	if($("#graphAnalysisCycle").val() == "")
	{
		PutRemoveWarningWithInput($("#graphAnalysisCycle"), "graphAnalysisCycle", "Inform the Graph Analysis Cycle!", false);
		ValidateOutPut = false;
	}
	else
	{
		PutRemoveWarningWithInput(null, "graphAnalysisCycle", "", true);
	}
	
	if(!IsNormalInteger($("#fieldPeaksDurationMinutes").val()))
	{
		PutRemoveWarningWithInput($("#fieldPeaksDurationMinutes"), "fieldPeaksDurationMinutes", "Invalid value for Peaks Duration!", false);
		ValidateOutPut = false;
	}
	else
	{
		PutRemoveWarningWithInput(null, "fieldPeaksDurationMinutes", "", true);
	}
	
	if(!IsNormalInteger($("#fieldAboveAverageLatencyPercent").val()))
	{
		PutRemoveWarningWithInput($("#fieldAboveAverageLatencyPercent"), "fieldAboveAverageLatencyPercent", "Invalid value for Above Average Latency!", false);
		ValidateOutPut = false;
	}
	else
	{
		PutRemoveWarningWithInput(null, "fieldAboveAverageLatencyPercent", "", true);
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
	
	return ValidateOutPut;
	
}


//Note: ! By Questor
function DisableEnableFields(disableEnableBool)
{
	if(disableEnableBool)
	{
		DisableEnableField($("#fieldServer"), true);
		DisableEnableField($("#fieldUDB"), true);
		DisableEnableField($("#fieldBase"), true);
		DisableEnableField($("#fieldUser"), true);
		DisableEnableField($("#fieldPassword"), true);
		DisableEnableField($("#fieldCycleTime"), true);
		DisableEnableField($("#graphAnalysisCycle"), true);
		DisableEnableField($("#fieldPeaksDurationMinutes"), true);
		DisableEnableField($("#fieldAboveAverageLatencyPercent"), true);
		DisableEnableField($("#fieldQueryTest"), true);
	}
	else
	{
		DisableEnableField($("#fieldServer"), false);
		DisableEnableField($("#fieldUDB"), false);
		DisableEnableField($("#fieldBase"), false);
		DisableEnableField($("#fieldUser"), false);
		DisableEnableField($("#fieldPassword"), false);
		DisableEnableField($("#fieldCycleTime"), false);
		DisableEnableField($("#graphAnalysisCycle"), false);
		DisableEnableField($("#fieldPeaksDurationMinutes"), false);
		DisableEnableField($("#fieldAboveAverageLatencyPercent"), false);
		DisableEnableField($("#fieldQueryTest"), false);
	}
}


//Note: ! By Questor
function DisableEnableField(fieldInstance, disableEnableBool)
{
	if(disableEnableBool)
	{
		fieldInstance.attr({
			readonly: true,
			style: "background:#dddddd;"
		});
	}
	else
	{
		fieldInstance.attr({
			readonly: false,
			style: "background:#ffffff;"
		});
	}
}


//Note: Validate that a string is a positive integer! By QUestor
function IsNormalInteger(strValue)
{
    var n = ~~Number(strValue);
    return String(n) === strValue && n >= 0;
}


//Note: Coloca ou remove avisos de validação! By Questor
function PutRemoveWarningWithInput(objectInstanceMenssagePosition, fieldNameOrId, message ,remove)
{
	if(!remove && $("#warning_" + fieldNameOrId).length == 0)
	{
		$(objectInstanceMenssagePosition).parent().after("<div id=\"warning_" + fieldNameOrId + "\" class=\"divBox divColumn texto6\" style=\"display:inline;margin-left:5px;color:F8C300;\">[!] " + message + "</div>");
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
				valueMaximumLB = 0;
				valueMaximumNT = 0;
				valueMinimumLB = 1000000000;
				valueMinimumNT = 1000000000;
				timeAverageNowLB = 0;
				timeAverageNowNT = 0;
				stopBenchmarking = false;
				$("div[name^=\"benchmarkLine\"]").remove();
				$("#buttonStartBenchmarking").attr("disabled", "disabled");
				Start_MaximumMinimumTimer();
				DisableEnableFields(true);
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
	$("#timeDateElapsed").text(moment(timeDateThatStarted, "YYYY-MM-DDThh:mm:ssTZD").fromNow());
	benchmarkingTimer = setTimeout("Start_Benchmarking();", parseInt($("#fieldCycleTime").val()));
}


//Note: ! By Questor
function Stop_Benchmarking()
{
	if(benchmarkingTimer)
	{
		clearTimeout(benchmarkingTimer);
		clearTimeout(defineMaximumMinimumTimer);
		timeDateThatTerminated = moment().format();
		$("#timeDateThatTerminated").text(timeDateThatTerminated);
		$("#timeDateElapsed").text(moment(timeDateThatStarted, "YYYY-MM-DDThh:mm:ssTZD").fromNow());
		defineMaximumMinimumTimer = 0;
		DefineMaximumMinimum();
		benchmarkingTimer = 0;
		timeSumLB = 0;
		timeSumNT = 0;
		timeAverageDenominator = 0;
		timeDateThatStarted = 0;
		timeDateThatTerminated = 0;
		blockBenchmarking = false;
		stopBenchmarking = true;
		$("#buttonStartBenchmarking").removeAttr("disabled");
		DisableEnableFields(false);
	}
}


//Note: ! By Questor
function Benchmarking()
{
	
	var startTimeNT = 0;
	var endTimeNT = 0;
	var timeNT = 0;
	var benchmarkingResultNow = 0;
	var benchmarkingOutPut = true;
	var benchmarkingError = true;
	
	blockBenchmarking = true;
	startTimeNT = GetTime();
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
					endTimeNT = GetTime();
					timeNT = parseInt(endTimeNT) - parseInt(startTimeNT) - parseInt(result.split("$")[1])
					if(timeNT < 0)
					{
						// Note: To debug! By Questor
						// alert("parseInt(endTimeNT) " + parseInt(endTimeNT))
						// alert("parseInt(parseInt(startTimeNT) " + parseInt(parseInt(startTimeNT)))
						// alert("parseInt(result.split(\"$\")[1]) " + parseInt(result.split("$")[1]))
						timeNT = 0;
					}
					benchmarkingResultNow = result + "$" + timeNT;
					benchmarkingError = false;
				}
				else
				{
					benchmarkingResultNow = result.replace("ASP_ERROR_COD", "");
				}
				CreateReport(benchmarkingResultNow, benchmarkingError);
			},
			error: function(xhr, status, error)
			{
				benchmarkingResultNow = "Error! Possible connectivity problem on the network! Description: \"" + error.description + "\". Status: \"" + status + "\". Server Return: \"" + xhr.responseText + "\".";
				CreateReport(benchmarkingResultNow, benchmarkingError);
			}
		});
		
	}
	catch(error)
	{
		benchmarkingResultNow = "Error! Possible problem with network connectivity or failure of javascript! Description: \"" + error.description + "\".";
		CreateReport(benchmarkingResultNow, benchmarkingError);
	}
	
	return benchmarkingOutPut;
	
}

// startTimeNotification = GetTime();
// endTimeNotification = GetTime();
// sumTimeNotification = GetTime();
// timeNT = parseInt(endTimeNT) - parseInt(startTimeNT)


var startTimeNotification = 0;
var sumTimeNotification = 0;
//Note: ! By Questor
function CreateReport(createReportInput, benchmarkingError)
{
	
	if(!stopBenchmarking)
	{
		

		if(!benchmarkingError)
		{
			timeAverageDenominator++;
			
			timeSumLB = parseInt(timeSumLB) + parseInt(createReportInput.split("$")[0]);
			timeSumNT = parseInt(timeSumNT) + parseInt(createReportInput.split("$")[2]);
			
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
				createReportInput.split("$")[0]
				if(createReportInput.split("$")[0] == 0)
				{
					$("#valueMinimumLB").text("\u2245" + createReportInput.split("$")[0] + " ms at " + moment().format());
				}
				else
				{
					$("#valueMinimumLB").text(createReportInput.split("$")[0] + " ms at " + moment().format());
				}
			}
			
			//NT
			$("#timeAverageNowNT").text(timeAverageNowNT + " ms");
			
			if(parseInt(createReportInput.split("$")[2]) > parseInt(valueMaximumNT))
			{
				createReportInput.split("$")[2]
				$("#valueMaximumNT").text(createReportInput.split("$")[2] + " ms at " + moment().format());
				valueMaximumNT = createReportInput.split("$")[2];
			}
			if(parseInt(createReportInput.split("$")[2]) < parseInt(valueMinimumNT))
			{
				createReportInput.split("$")[2]
				if(createReportInput.split("$")[2] == 0)
				{
					$("#valueMinimumNT").text("\u2245" + createReportInput.split("$")[2] + " ms at " + moment().format());
				}
				else
				{
					$("#valueMinimumNT").text(createReportInput.split("$")[2] + " ms at " + moment().format());
				}
				valueMinimumNT = createReportInput.split("$")[2];
			}
			
			//LB
			var titleLB = "[" + createReportInput.split("$")[0] + " ms at [" + moment().format() + "]";
			$("#benchmarkOutPutDivLB").append("<div name=\"benchmarkLineLB\" title=\"" + titleLB + "\" class=\"divLine gfxDiv1\" style=\"width:" + createReportInput.split("$")[0] + "px;\"></div>");
			
			//NT
			var titleNT = "[" + createReportInput.split("$")[2] + " ms at [" + moment().format() + "]";
			$("#benchmarkOutPutDivNT").append("<div name=\"benchmarkLineNT\" title=\"" + titleNT + "\" class=\"divLine gfxDiv2\" style=\"width:" + createReportInput.split("$")[2] + "px;\"></div>");
			
			if($("#fieldAlertPeakEnabled").prop("checked"))
			{
				var aboveAverageLimit = 0;
				aboveAverageLimit = parseInt(timeAverageNowLB) * (100 + parseInt($("#fieldAboveAverageLatencyPercent").val())) / 100;
				if(parseInt(createReportInput.split("$")[0]) > aboveAverageLimit)
				{
					if(startTimeNotification == 0)
					{
						startTimeNotification = GetTime();
					}
					// Note: 600000 -> 10 minutes!
					// Note: 60000 -> 1 minute!
					if(parseInt(GetTime()) - parseInt(startTimeNotification) > (parseInt($("#fieldPeaksDurationMinutes").val()) * 60000))
					{
						DefineMaximumMinimum();
						startTimeNotification = 0;
						alert("!!!Latency Peak detected!!!");
					}
				}
				else
				{
					startTimeNotification = 0;
				}
			}
			else
			{
				startTimeNotification = 0;
			}
			
		}
		else
		{
			$("#benchmarkOutPutDivLB").append("<div name=\"benchmarkLineLBError\" title=\"At [" + moment().format() + "]\" class=\"divLine gfxDiv3\">" + createReportInput + "</div>");
			$("#benchmarkOutPutDivNT").append("<div name=\"benchmarkLineNTError\" title=\"At [" + moment().format() + "]\" class=\"divLine gfxDiv3\">" + createReportInput + "</div>");
			if($("#fieldAlertErrorEnabled").prop("checked"))
			{
				alert("!!!Error detected!!!");				
			}
		}
	}
	
	if(($(document).height() - ($(window).scrollTop() + $(window).height())) <= 4)
	{
		$('body').animate({
			scrollTop:$(document).height()-$(window).height()
		}, 0);
	}
	
	blockBenchmarking = false;
	
}

function pad(width, string, padding)
{
	return (width <= string.length) ? string : pad(width, string + padding, padding)
}


//Note: ! By Questor
function Start_MaximumMinimumTimer()
{
	if(!stopBenchmarking)
	{
		DefineMaximumMinimum();
	}
	defineMaximumMinimumTimer = setTimeout("Start_MaximumMinimumTimer();", parseInt($("#graphAnalysisCycle").val()));
}


function DefineMaximumMinimum()
{
	
	var benchmarkLineLBArray = $("div[name=\"benchmarkLineLB\"]");
	
	benchmarkLineLBArray.css({"background-color":"#165389", "height":"5px;"});
	
	$.each(benchmarkLineLBArray, function(index, value)
	{
		if($(benchmarkLineLBArray[index]).css("width") == "" + valueMaximumLB + "px")
		{
			$(benchmarkLineLBArray[index]).css({"background-color":"#E71B1E", "height":"5px;"});
		}else if(parseInt($(benchmarkLineLBArray[index]).css("width").replace("px", "")) > parseInt(timeAverageNowLB))
		{
			$(benchmarkLineLBArray[index]).css({"background-color":"#F8C300", "height":"5px;"});
		}
		
	});
	
	var benchmarkLineNTArray = $("div[name=\"benchmarkLineNT\"]");
	
	benchmarkLineNTArray.css({"background-color":"#00923D", "height":"5px;"});
	
	$.each(benchmarkLineNTArray, function(index, value)
	{
		if($(benchmarkLineNTArray[index]).css("width") == "" + valueMaximumNT + "px")
		{
			$(benchmarkLineNTArray[index]).css({"background-color":"#E71B1E", "height":"5px;"});
		}else if(parseInt($(benchmarkLineNTArray[index]).css("width").replace("px","")) > parseInt(timeAverageNowNT))
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

