<%
	
	REM //Note: �til para debug! By Questor
	REM response.write "rodou!"
	
%>

<%
	
	
	REM //Note: 
	REM //Note: #### Primeira linha que deve a ser executada nesse arquivo!!!! ####
	REM //Note: 
	REM //Note: Permite exibir caracteres latinos de forma correta tanto na hora de setar as vari�veis de sess�o como quando as recuperamos ! By Questor
	Session.CodePage = 28591
	
	
	REM //Note: Vari�veis gerais do c�digo! By Questor
	dim errorOutPut
	errorOutPut = ""
	dim stillRunning
	stillRunning = true
	
	
	REM //Note: Vari�veis para os valores recuperados da chamada Ajax! By Questor
	dim valueToSet
	valueToSet = ""
	
	
	REM //Note: Controla a execu��o! By Questor
	if SetOrGetSessionVariable() then
		
	end if
	
	
	REM //Note: Recupera os valores da chamada Ajax para setar vari�veis de sess�o ou recupera-las! By Questor
	function SetOrGetSessionVariable()
		
		valueToSet = request.form("valueToSet")
		
		if valueToSet = "" then
			stillRunning = false
			errorOutPut = errorOutPut & "Erro! Uma informa��o necess�ria para executar a opera��o est� ausente!   "
		else
			if valueToSet = "GET" then
					
					REM //Note: Permite exibir caracteres latinos de forma correta quando esses valores s�o recuperados pelo JavaScript! By Questor
					Response.Charset = "UTF-8"
					Session.CodePage = 65001
					
					response.write Session("SessionVariable")
					
			else
					REM //Note: Essa vari�vel de sess�o � mantida para uso no GoldenPortal! By Questor
					Session("SessionVariable") = Trim(valueToSet)
			end if
		end if
		
		SetOrGetSessionVariable = stillRunning
		
	end function
	
	
	REM //Note: Verifica se h� erros. Se houver, exibe texto com o erro na p�gina ASP! By Questor
	if errorOutPut <> "" then
		
		
		REM //Note: Permite exibir caracteres latinos de forma correta quando esses valores s�o recuperados pelo JavaScript! By Questor
		Response.Charset = "UTF-8"
		Session.CodePage = 65001
		
		response.write "ASP_ERROR_COD" & errorOutPut
		
		
	end if
	
	
	REM //Note: 
	REM //Note: #### �ltima linha que deve a ser executada nesse arquivo!!!! ####
	REM //Note: 
	REM //Note: Faz-se necess�rio retornar o "encodamento" para "28591", pois caso contr�rio podem haver impactos negativos em outras p�ginas ASP! By Questor
	Session.CodePage = 28591
	
	
%>
