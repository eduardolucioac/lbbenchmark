$(document).ready(function(){
	
});


function Convert_LBTXT()
{
	
	var input_LBTXT_Text = $("#input_LBTXT").val();
	var convert_LBTXT_OutPut = "";
	var newLine = "\n";
	var arrayOfLines0 = input_LBTXT_Text.split(/\r\n|[\n\v\f\r\x85\u2028\u2029]/);
	var blockBaseIdentification = true;
	var blockFields = true;
	var blockMultivaluedGroups = true;
	var arrayBaseIdentification = [];
	var arrayFields = [];
	arrayFields[0] = [];
	arrayFields[0][0] = [];
	var arrayFieldsIndex0 = 0;
	var arrayFieldsIndex1 = 0;
	var arrayFieldsIndex2 = 0;
	var firstField = true;
	var arrayMultivaluedGroups = [];
	arrayMultivaluedGroups[0] = [];
	var arrayMultivaluedGroupsIndex0 = 0;
	var arrayMultivaluedGroupsIndex1 = 0;
	var firstMultivaluedGroup = true
	
	var index0;
	for(index0 = 0; index0 < arrayOfLines0.length; ++index0)
	{
		
		
		// Note: Libera o bloco identificação da base! By Questor
		if(arrayOfLines0[index0].indexOf("@IDENTIFICACAO") !== -1)
		{
			blockBaseIdentification = false;
			blockFields = true;
			blockMultivaluedGroups = true;
		}
		
		// Note: Libera o bloco campos da base! By Questor
		if(arrayOfLines0[index0].indexOf("@CAMPOS: ") !== -1)
		{
			blockFields = false;
		}
		
		// Note: Libera o bloco grupos multivalorados da base! By Questor
		if(arrayOfLines0[index0].indexOf("@GRUPOS: ") !== -1)
		{
			blockMultivaluedGroups = false;
		}
		
		
		// Note: Bloco identificação da base! By Questor
		if(!blockBaseIdentification)
		{
			
			if(arrayOfLines0[index0].indexOf(".DESCRICAO: ") !== -1)
			{
				arrayBaseIdentification[0] = Trim(arrayOfLines0[index0].replace(".DESCRICAO: ", "").replace(/'/g, ""));
			}
			
			if(arrayOfLines0[index0].indexOf(".APELIDO: ") !== -1)
			{
				arrayBaseIdentification[1] = Trim(arrayOfLines0[index0].replace(".APELIDO: ", ""));
			}
			
			if(!blockFields)
			{
				
				blockBaseIdentification = true;
				blockMultivaluedGroups = true;
				
			}
			
		}


		// Note: Bloco campos da base! By Questor
		if(!blockFields)
		{
			
			if(arrayOfLines0[index0].indexOf(".DESCRICAO: ") !== -1)
			{
				
				if(!firstField)
				{
					arrayFieldsIndex0++;
					arrayFieldsIndex1 = 0;
				}
				else
				{
					firstField = false;
				}
				
				var arrayFieldLine = arrayOfLines0[index0].replace(".DESCRICAO: ", "").split(", ");
				arrayFieldLine.unshift("#DESCRICAO");
				
				var index1;
				for(index1 = 0; index1 < arrayFieldLine.length; ++index1)
				{
					if (!arrayFields[arrayFieldsIndex0]) arrayFields[arrayFieldsIndex0] = [];
					if (!arrayFields[arrayFieldsIndex0][arrayFieldsIndex1]) arrayFields[arrayFieldsIndex0][arrayFieldsIndex1] = [];
					if(index1 == 1)
					{
						arrayFields[arrayFieldsIndex0][arrayFieldsIndex1][index1] = Trim(arrayFieldLine[index1].replace(/'/g, ""))
					}
					else
					{
						arrayFields[arrayFieldsIndex0][arrayFieldsIndex1][index1] = Trim(arrayFieldLine[index1]);
					}
				}
				
				arrayFieldsIndex1++;
				
			}
			
			if(arrayOfLines0[index0].indexOf(".INDICE: ") !== -1)
			{
				
				var arrayFieldLine = arrayOfLines0[index0].replace(".INDICE: ", "").split(" | ");
				arrayFieldLine.unshift("#INDICE");
				
				var index2;
				for(index2 = 0; index2 < arrayFieldLine.length; ++index2)
				{
					if (!arrayFields[arrayFieldsIndex0]) arrayFields[arrayFieldsIndex0] = [];
					if (!arrayFields[arrayFieldsIndex0][arrayFieldsIndex1]) arrayFields[arrayFieldsIndex0][arrayFieldsIndex1] = [];
					arrayFields[arrayFieldsIndex0][arrayFieldsIndex1][index2] = Trim(arrayFieldLine[index2]);
				}
				
				arrayFieldsIndex1++;
				
			}
			
			if(arrayOfLines0[index0].indexOf(".ESPECIAL: ") !== -1)
			{
				
				var fieldLineTemp0 = arrayOfLines0[index0].replace(".ESPECIAL", "").split(": ")[1];
				
				if(fieldLineTemp0.indexOf("hh") === -1 && fieldLineTemp0.indexOf("mm") === -1 && fieldLineTemp0.indexOf("ss") === -1 && fieldLineTemp0.indexOf("dd") === -1 && fieldLineTemp0.indexOf("yy") === -1)
				{
					var arrayFieldTemp0 = fieldLineTemp0.split(", ");
					arrayFieldTemp0.unshift("#ESPECIAL");
					var index3;
					for(index3 = 0; index3 < arrayFieldTemp0.length; ++index3)
					{
						if (!arrayFields[arrayFieldsIndex0]) arrayFields[arrayFieldsIndex0] = [];
						if (!arrayFields[arrayFieldsIndex0][arrayFieldsIndex1]) arrayFields[arrayFieldsIndex0][arrayFieldsIndex1] = [];
						arrayFields[arrayFieldsIndex0][arrayFieldsIndex1][index3] = Trim(arrayFieldTemp0[index3]);
					}
				}
				
				arrayFieldsIndex1++;
				
			}
			
			if(arrayOfLines0[index0].indexOf(".VALIDACAO: FORMULA, ") !== -1)
			{
				
				var fieldLineTemp0 = arrayOfLines0[index0].replace(".VALIDACAO: FORMULA, ", "");
				
				if(fieldLineTemp0.toUpperCase().indexOf("ISEMPTY") !== -1)
				{
					if (!arrayFields[arrayFieldsIndex0]) arrayFields[arrayFieldsIndex0] = [];
					if (!arrayFields[arrayFieldsIndex0][arrayFieldsIndex1]) arrayFields[arrayFieldsIndex0][arrayFieldsIndex1] = [];
					arrayFields[arrayFieldsIndex0][arrayFieldsIndex1][0] = "#VALIDACAOFORMULA";
					arrayFields[arrayFieldsIndex0][arrayFieldsIndex1][1] = Trim(fieldLineTemp0);
				}
				
				arrayFieldsIndex1++;
				
			}
			
			
			// ToDo: Tratar preenchimento? By Questor
			// if(arrayOfLines0[index0].indexOf(".PREENCHIMENTO: ") !== -1)
			// {
				
				// var fieldLineTemp0 = arrayOfLines0[index0].replace(".PREENCHIMENTO: ", "");
				
				// if(fieldLineTemp0.toUpperCase().indexOf("ISEMPTY") !== -1)
				// {
					// if (!arrayFields[arrayFieldsIndex0]) arrayFields[arrayFieldsIndex0] = [];
					// if (!arrayFields[arrayFieldsIndex0][arrayFieldsIndex1]) arrayFields[arrayFieldsIndex0][arrayFieldsIndex1] = [];
					// arrayFields[arrayFieldsIndex0][arrayFieldsIndex1][0] = "#PREENCHIMENTO";
					// arrayFields[arrayFieldsIndex0][arrayFieldsIndex1][1] = Trim(fieldLineTemp0);
				// }
				
				// arrayFieldsIndex1++;
				
			// }
			
			if(!blockMultivaluedGroups)
			{
				
				blockBaseIdentification = true;
				blockFields = true;
				
			}
			
		}
		
		
		// Note: Bloco grupos multivalorados da base! By Questor
		if(!blockMultivaluedGroups)
		{
			
			if(arrayOfLines0[index0].indexOf(".DESCRICAO: ") !== -1)
			{
				
				if(!firstMultivaluedGroup)
				{
					arrayMultivaluedGroupsIndex0++;
					arrayMultivaluedGroupsIndex1 = 0;
				}
				else
				{
					firstMultivaluedGroup = false;
				}
				
				var arrayMultivaluedGroupLine = arrayOfLines0[index0].replace(".DESCRICAO: ", "");
				
				if (!arrayMultivaluedGroups[arrayMultivaluedGroupsIndex0]) arrayMultivaluedGroups[arrayMultivaluedGroupsIndex0] = [];
				arrayMultivaluedGroups[arrayMultivaluedGroupsIndex0][arrayMultivaluedGroupsIndex1] = Trim(arrayMultivaluedGroupLine.replace(/'/g, ""));
				
			}
			
			if(arrayOfLines0[index0].indexOf(".CAMPO: ") !== -1)
			{
				
				arrayMultivaluedGroupsIndex1++;
				var arrayMultivaluedGroupLine = arrayOfLines0[index0].replace(".CAMPO: ", "");
				if (!arrayMultivaluedGroups[arrayMultivaluedGroupsIndex0]) arrayMultivaluedGroups[arrayMultivaluedGroupsIndex0] = [];
				arrayMultivaluedGroups[arrayMultivaluedGroupsIndex0][arrayMultivaluedGroupsIndex1] = Trim(arrayMultivaluedGroupLine);
				
			}
			
		}
		
	}
	
	
	// Note: Monta os blocos campos da base e grupos multivalorados! By Questor
	var arrayMultivaluedGroupsFields = [];
	arrayMultivaluedGroupsFields[0] = [];
	var isMonoValued = "";
	var fieldName = "";
	var fieldNameGroup = "";
	var groupIsAlreadyInTheList = false;
	var ODLFieldPart0 = "";
	var ODLFieldPart1_0 = "";
	var ODLFieldPart1_1 = "";
	var ODLFieldPart2 = "";
	var lineIterateBreaker = 0;
	var lineIterateBreakerFallBack = 0;
	var arrayMonovaluedFields = [];
	var arrayMonovaluedFieldsIndex0 = 0;
	var arrayMultivaluedGroupsFieldsIndex0 = 0
	var arrayMultivaluedGroupsFieldsIndex1 = 0
	var arrayMultivaluedGroupsIndex0 = 0;
	var arrayMultivaluedGroupsIndex1 = 0;
	var arrayMultivaluedGroupsAddIndex0 = 0;
	
	arrayFieldsIndex0 = 0;
	for (arrayFieldsIndex0 = 0; arrayFieldsIndex0 < arrayFields.length; arrayFieldsIndex0++)
	{
		if(arrayFields[arrayFieldsIndex0])
		{
			isMonoValued = "";
			fieldName = "";
			ODLFieldPart0 = "";
			ODLFieldPart1_0 = "";
			ODLFieldPart1_1 = "";
			ODLFieldPart2 = "";
			arrayFieldsIndex1 = 0;
			for (arrayFieldsIndex1 = 0; arrayFieldsIndex1 < arrayFields[arrayFieldsIndex0].length; arrayFieldsIndex1++)
			{
				if(arrayFields[arrayFieldsIndex0][arrayFieldsIndex1])
				{
					var breakForLoop = false;
					var confirmHolder = false;
					var configurationGroup = "";
					lineIterateBreaker = 0;
					lineIterateBreakerFallBack = 0;
					while(arrayFields[arrayFieldsIndex0][arrayFieldsIndex1].length > lineIterateBreaker)
					{
						arrayFieldsIndex2 = 0;
						for (arrayFieldsIndex2 = 0; arrayFieldsIndex2 < arrayFields[arrayFieldsIndex0][arrayFieldsIndex1].length; arrayFieldsIndex2++)
						{
							if(arrayFields[arrayFieldsIndex0][arrayFieldsIndex1][arrayFieldsIndex2])
							{
								
								if(arrayFieldsIndex2 == 0)
								{
									switch(arrayFields[arrayFieldsIndex0][arrayFieldsIndex1][arrayFieldsIndex2])
									{
										case "#DESCRICAO":
											configurationGroup = "#DESCRICAO";
											lineIterateBreaker++;
											break;
										case "#INDICE":
											configurationGroup = "#INDICE";
											lineIterateBreaker++;
											break;
										case "#ESPECIAL":
											configurationGroup = "#ESPECIAL";
											lineIterateBreaker++;
											break;
										case "#VALIDACAOFORMULA":
											configurationGroup = "#VALIDACAOFORMULA";
											lineIterateBreaker++;
											break;
										// ToDo: Tratar preenchimento? By Questor
										// case "#PREENCHIMENTO":
											// configurationGroup = "#PREENCHIMENTO";
											// lineIterateBreaker++;
											// break;
										default:
											
									}
								}
								
								if(isMonoValued == "")
								{
									switch(arrayFields[arrayFieldsIndex0][arrayFieldsIndex1][arrayFieldsIndex2])
									{
										// Note: Campo multivalorado ou não! By Questor
										case "NAO_MULTIVALORADO":
											if(arrayFieldsIndex2 > 2)
											{
												isMonoValued = "NAO_MULTIVALORADO";
												lineIterateBreaker++;
												// breakForLoop = true;
											}
											break;
										case "MULTIVALORADO":
											if(arrayFieldsIndex2 > 2)
											{
												isMonoValued = "MULTIVALORADO";
												lineIterateBreaker++;
												// breakForLoop = true;
											}
											break;
										default:
											
									}
								}
								
								if(configurationGroup == "#DESCRICAO")
								{
									if(arrayFieldsIndex2 == 2 && ODLFieldPart1_0 == "")
									{
										ODLFieldPart1_0 = arrayFields[arrayFieldsIndex0][arrayFieldsIndex1][arrayFieldsIndex2] + " ";
										fieldName = arrayFields[arrayFieldsIndex0][arrayFieldsIndex1][arrayFieldsIndex2];
									}
									else if(arrayFieldsIndex2 == 1 && ODLFieldPart1_1 == "")
									{
										ODLFieldPart1_1 = "description=\"" + arrayFields[arrayFieldsIndex0][arrayFieldsIndex1][arrayFieldsIndex2] + "\" ";
									}
									else
									{
										switch(arrayFields[arrayFieldsIndex0][arrayFieldsIndex1][arrayFieldsIndex2])
										{
											// Note: Tipo do campo! By Questor
											case "ALFANUMERICO":
												ODLFieldPart0 = "string ";
												lineIterateBreaker++;
												break;
											case "DATA":
												ODLFieldPart0 = "date ";
												lineIterateBreaker++;
												break;
											case "DECIMAL":
												ODLFieldPart0 = "double ";
												lineIterateBreaker++;
												break;
											case "DOCUMENTO":
												ODLFieldPart0 = "document ";
												lineIterateBreaker++;
												break;
											case "HORA":
												ODLFieldPart0 = "time ";
												lineIterateBreaker++;
												break;
											case "INTEIRO":
												// Note: Definido no grupo "#ESPECIAL"! By Questor
												lineIterateBreaker++;
												break;
											case "VERFALSO":
												ODLFieldPart0 = "boolean ";
												lineIterateBreaker++;
												break;
											default:
												
										}
									}
								}
								
								if(configurationGroup == "#INDICE")
								{
									switch(arrayFields[arrayFieldsIndex0][arrayFieldsIndex1][arrayFieldsIndex2])
									{
										// Note: Indexação do campo! By Questor
										case "CHAVEUNICA":
											ODLFieldPart2 = ODLFieldPart2 + "unique ";
											lineIterateBreaker++;
											break;
										case "FONETICO":
											ODLFieldPart2 = ODLFieldPart2 + "soundindex ";
											lineIterateBreaker++;
											break;
										case "PORCAMPO":
											ODLFieldPart2 = ODLFieldPart2 + "index ";
											lineIterateBreaker++;
											break;
										case "TEXTUAL":
											ODLFieldPart2 = ODLFieldPart2 + "textualindex ";
											lineIterateBreaker++;
											break;
										case "VAZIO":
											ODLFieldPart2 = ODLFieldPart2 + "nullindex ";
											lineIterateBreaker++;
											break;
										default:
											
									}
								}
								
								if(configurationGroup == "#ESPECIAL")
								{
									var regex = /^\d+$/;
									if(regex.test(arrayFields[arrayFieldsIndex0][arrayFieldsIndex1][arrayFieldsIndex2]))
									{
										ODLFieldPart2 = ODLFieldPart2 + "size=" + arrayFields[arrayFieldsIndex0][arrayFieldsIndex1][arrayFieldsIndex2] + " ";
										lineIterateBreaker++;
									}
									else
									{
										switch(arrayFields[arrayFieldsIndex0][arrayFieldsIndex1][arrayFieldsIndex2])
										{
											// Note: Configuração do tipo numérico e autoenumeração! By Questor
											case "DOUBLE":
												// Note: Inerente ao tipo declarado. Não necessário ao ODL! By Questor
												lineIterateBreaker++;
												break;
											case "AUTOENUM":
												ODLFieldPart0 = "autoincrement ";
												// Note: Para "autoincrement" a indexação "index" é a única permitida! By Questor
												ODLFieldPart2 = "index ";
												lineIterateBreaker++;
												break;
											case "NAO_AUTOENUM":
												// Note: Inerente ao tipo declarado. Não necessário ao ODL! By Questor
												lineIterateBreaker++;
												break;
											case "SHORT":
												ODLFieldPart0 = "short ";
												// ToDo: Regra para quando o tipo for "INTEIRO"! By Questor
												lineIterateBreaker++;
												break;
											case "LONG":
												ODLFieldPart0 = "long ";
												// ToDo: Regra para quando o tipo for "INTEIRO"! By Questor
												lineIterateBreaker++;
												break;
											default:
												
										}
									}
								}
								
								if(configurationGroup == "#VALIDACAOFORMULA" && arrayFieldsIndex2 == 0)
								{
									confirmHolder = confirm("A validação abaixo pode ser considerada uma indexação do tipo\"not null\"?\n\n" + arrayFields[arrayFieldsIndex0][arrayFieldsIndex1][1])
									if(confirmHolder)
									{
										ODLFieldPart2 = ODLFieldPart2 + "not null ";
									}
									lineIterateBreaker++;
								}
								
								
								// ToDo: Tratar preenchimento? By Questor
								// if(configurationGroup == "#PREENCHIMENTO" && arrayFieldsIndex2 == 0)
								// {
									// confirmHolder = confirm("A fórmula abaixo pode ser considerada uma indexação do tipo\"not null\"?\n\n" + arrayFields[arrayFieldsIndex0][arrayFieldsIndex1][1])
									// if(confirmHolder)
									// {
										// ODLFieldPart2 = ODLFieldPart2 + "not null ";
									// }
									// lineIterateBreaker++;
								// }
								
								if(breakForLoop)
								{
									breakForLoop = false;
									break;
								}
								
								if(lineIterateBreakerFallBack > 200)
								{
									// ToDo: Aviso de falha! By Questor
									alert("Configuração não detectada!")
									alert(arrayFields[arrayFieldsIndex0][arrayFieldsIndex1][arrayFieldsIndex2]);
									breakForLoop = false;
									break;
								}
								
								lineIterateBreakerFallBack++;
							}
							else
							{
								break;
							}
						}
					}
				}
				else
				{
					break;
				}
			}
			
			arrayMultivaluedGroupsFieldsIndex0 = 0;
			arrayMultivaluedGroupsIndex0 = 0;
			arrayMultivaluedGroupsIndex1 = 0;
			
			groupIsAlreadyInTheList = false;
			
			fieldNameGroup = "";
			if(isMonoValued == "NAO_MULTIVALORADO")
			{
				arrayMonovaluedFields[arrayMonovaluedFieldsIndex0] = ("attribute " + ODLFieldPart0 + ODLFieldPart1_0 + ODLFieldPart1_1 + ODLFieldPart2 + ";").replace(" ;", ";");
				arrayMonovaluedFieldsIndex0++;
			}
			else if(isMonoValued == "MULTIVALORADO")
			{
				
				arrayMultivaluedGroupsIndex0 = 0;
				for (arrayMultivaluedGroupsIndex0 = 0; arrayMultivaluedGroupsIndex0 < arrayMultivaluedGroups.length; arrayMultivaluedGroupsIndex0++)
				{
					if(arrayMultivaluedGroups[arrayMultivaluedGroupsIndex0])
					{
						arrayMultivaluedGroupsIndex1 = 0;
						for (arrayMultivaluedGroupsIndex1 = 0; arrayMultivaluedGroupsIndex1 < arrayMultivaluedGroups[arrayMultivaluedGroupsIndex0].length; arrayMultivaluedGroupsIndex1++)
						{
							if(arrayMultivaluedGroups[arrayMultivaluedGroupsIndex0][arrayMultivaluedGroupsIndex1] == fieldName)
							{
								fieldNameGroup = arrayMultivaluedGroups[arrayMultivaluedGroupsIndex0][0];
								
								
								// Note: To debug! By Questor
								// alert("#fieldName: " + fieldName + " #fieldNameGroup: " + fieldNameGroup);
								
							}
						}
					}
				}
				
				arrayMultivaluedGroupsFieldsIndex0 = 0;
				for (arrayMultivaluedGroupsFieldsIndex0 = 0; arrayMultivaluedGroupsFieldsIndex0 < arrayMultivaluedGroupsFields.length; arrayMultivaluedGroupsFieldsIndex0++)
				{
					if(arrayMultivaluedGroupsFields[arrayMultivaluedGroupsFieldsIndex0])
					{
						if(arrayMultivaluedGroupsFields[arrayMultivaluedGroupsFieldsIndex0][0] == fieldNameGroup)
						{
							
							
							// Note: To debug! By Questor
							// convert_LBTXT_OutPut = convert_LBTXT_OutPut + "[" + zfill1(arrayMultivaluedGroupsFieldsIndex0, 3) + "][" + zfill1(arrayMultivaluedGroupsFields[arrayMultivaluedGroupsFieldsIndex0].length, 3) + "] #fieldNameGroup: " + fieldNameGroup + " #fieldName: " + fieldName + newLine;
							
							groupIsAlreadyInTheList = true;
							arrayMultivaluedGroupsFields[arrayMultivaluedGroupsFieldsIndex0][arrayMultivaluedGroupsFields[arrayMultivaluedGroupsFieldsIndex0].length] = Trim(("attribute " + ODLFieldPart0 + ODLFieldPart1_0 + ODLFieldPart1_1 + ODLFieldPart2 + ";").replace(" ;", ";"));
							break;
						}
					}
				}
				
				if(!groupIsAlreadyInTheList)
				{
					if (!arrayMultivaluedGroupsFields[arrayMultivaluedGroupsAddIndex0]) arrayMultivaluedGroupsFields[arrayMultivaluedGroupsAddIndex0] = [];
					if(fieldNameGroup == "")
					{
						arrayMultivaluedGroupsFields[arrayMultivaluedGroupsAddIndex0][0] = Trim("NOTGROUPEDMULTIVALUEDFIELD");
						
						
						// Note: To debug! By Questor
						// fieldNameGroup = "NOTGROUPEDMULTIVALUEDFIELD";
						
					}
					else
					{
						arrayMultivaluedGroupsFields[arrayMultivaluedGroupsAddIndex0][0] = Trim(fieldNameGroup);
					}
					arrayMultivaluedGroupsFields[arrayMultivaluedGroupsAddIndex0][1] = Trim(("attribute " + ODLFieldPart0 + ODLFieldPart1_0 + ODLFieldPart1_1 + ODLFieldPart2 + ";").replace(" ;", ";"));
					
					
					// Note: To debug! By Questor
					// convert_LBTXT_OutPut = convert_LBTXT_OutPut + "[" + zfill1(arrayMultivaluedGroupsAddIndex0, 3) + "][001] #fieldNameGroup: " + fieldNameGroup + " #fieldName: " + fieldName + newLine;
					
					arrayMultivaluedGroupsAddIndex0++;
				}
				
			}
			
		}
		else
		{
			break;
		}
	}
	
	
	// Note: Montar a ODL! By Questor
	
	
	// Note: Monta o bloco identificação da base! By Questor
	convert_LBTXT_OutPut = convert_LBTXT_OutPut + "class " + arrayBaseIdentification[1] + newLine;
	convert_LBTXT_OutPut = convert_LBTXT_OutPut + "(extent " + arrayBaseIdentification[1] + " description = \"" + arrayBaseIdentification[0] + "\")" + newLine + "{" + newLine;
	
	
	// Note: Monta o bloco com os campos monovalorados da base! By Questor
	arrayMonovaluedFieldsIndex0 = 0;
	for (arrayMonovaluedFieldsIndex0 = 0; arrayMonovaluedFieldsIndex0 < arrayMonovaluedFields.length; arrayMonovaluedFieldsIndex0++)
	{
		convert_LBTXT_OutPut = convert_LBTXT_OutPut + "    " + arrayMonovaluedFields[arrayMonovaluedFieldsIndex0] + newLine;
	}
	
	var notGroupedMultivaluedFields = "";
	var groupedMultivaluedFields = "";
	
	
	// Note: Monta o bloco com os campos multivalorados da base! By Questor
	arrayMultivaluedGroupsFieldsIndex0 = 0;
	for (arrayMultivaluedGroupsFieldsIndex0 = 0; arrayMultivaluedGroupsFieldsIndex0 < arrayMultivaluedGroupsFields.length; arrayMultivaluedGroupsFieldsIndex0++)
	{
		if(arrayMultivaluedGroupsFields[arrayMultivaluedGroupsFieldsIndex0])
		{
			arrayMultivaluedGroupsFieldsIndex1 = 0;
			for (arrayMultivaluedGroupsFieldsIndex1 = 0; arrayMultivaluedGroupsFieldsIndex1 < arrayMultivaluedGroupsFields[arrayMultivaluedGroupsFieldsIndex0].length; arrayMultivaluedGroupsFieldsIndex1++)
			{
				if(arrayMultivaluedGroupsFields[arrayMultivaluedGroupsFieldsIndex0][0] == "NOTGROUPEDMULTIVALUEDFIELD")
				{
					if(arrayMultivaluedGroupsFieldsIndex1 > 0)
					{
						notGroupedMultivaluedFields = notGroupedMultivaluedFields + "    " + arrayMultivaluedGroupsFields[arrayMultivaluedGroupsFieldsIndex0][1].replace(arrayMultivaluedGroupsFields[arrayMultivaluedGroupsFieldsIndex0][1].split(" ")[1], "set<" + arrayMultivaluedGroupsFields[arrayMultivaluedGroupsFieldsIndex0][1].split(" ")[1] + ">") + newLine;
					}
				}
				else
				{
					if(arrayMultivaluedGroupsFieldsIndex1 == 0)
					{
						groupedMultivaluedFields = groupedMultivaluedFields + "    attribute set<" + newLine + "        struct" + newLine + "        {" + newLine;
					}
					else
					{
						groupedMultivaluedFields = groupedMultivaluedFields + "            " + arrayMultivaluedGroupsFields[arrayMultivaluedGroupsFieldsIndex0][arrayMultivaluedGroupsFieldsIndex1] + newLine;
					}
					
					if((arrayMultivaluedGroupsFieldsIndex1 + 1) == arrayMultivaluedGroupsFields[arrayMultivaluedGroupsFieldsIndex0].length)
					{
						groupedMultivaluedFields = groupedMultivaluedFields + "        }" + newLine + "        > " + arrayMultivaluedGroupsFields[arrayMultivaluedGroupsFieldsIndex0][0] + ";" + newLine;
					}
				}
			}
		}
	}
	
	convert_LBTXT_OutPut = convert_LBTXT_OutPut + notGroupedMultivaluedFields + groupedMultivaluedFields + "}" + newLine;
	
	$("#output_ODL").val(convert_LBTXT_OutPut);
	
}


//Note: Esta função simula exatamente a função TRIM existente no VbScript! By Questor
function Trim(str)
{
	return str.replace(/^\s+|\s+$/g,"");
}


//Note: Esta função que completa com zeros a esquerda um número! By Questor
function zfill1(number, size) {
  number = number.toString();
  while (number.length < size) number = "0" + number;
  return number;
}
