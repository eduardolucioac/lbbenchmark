<%
	
	REM //Note: Útil para debug! By Questor
	REM response.write "rodou!"
	
%>

<%
	
	
	REM //Note: 
	REM //Note: #### Primeira linha que deve a ser executada nesse arquivo!!!! ####
	REM //Note: 
	REM //Note: Permite exibir caracteres latinos de forma correta tanto na hora de setar as variáveis de sessão como quando as recuperamos ! By Questor
	Session.CodePage = 28591
	
	
	REM //Note: Variáveis gerais do código! By Questor
	dim errorOutPut
	errorOutPut = ""
	dim stillRunning
	stillRunning = true
	
	
	REM //Note: Variáveis para os valores recuperados da chamada Ajax! By Questor
	dim valueToSet
	valueToSet = ""
	
	
	REM //Note: Controla a execução! By Questor
	if SetOrGetSessionVariable() then
		
	end if
	
	
	REM //Note: Recupera os valores da chamada Ajax para setar variáveis de sessão ou recupera-las! By Questor
	function SetOrGetSessionVariable()
		
		valueToSet = request.form("valueToSet")
		
		if valueToSet = "" then
			stillRunning = false
			errorOutPut = errorOutPut & "Erro! Uma informação necessária para executar a operação está ausente!   "
		else
			if valueToSet = "GET" then
					
					REM //Note: Permite exibir caracteres latinos de forma correta quando esses valores são recuperados pelo JavaScript! By Questor
					Response.Charset = "UTF-8"
					Session.CodePage = 65001
					
					response.write Session("SessionVariable")
					
			else
					REM //Note: Essa variável de sessão é mantida para uso no GoldenPortal! By Questor
					Session("SessionVariable") = Trim(valueToSet)
			end if
		end if
		
		SetOrGetSessionVariable = stillRunning
		
	end function
	
	
	REM //Note: Verifica se há erros. Se houver, exibe texto com o erro na página ASP! By Questor
	if errorOutPut <> "" then
		
		
		REM //Note: Permite exibir caracteres latinos de forma correta quando esses valores são recuperados pelo JavaScript! By Questor
		Response.Charset = "UTF-8"
		Session.CodePage = 65001
		
		response.write "ASP_ERROR_COD" & errorOutPut
		
		
	end if
	
	
	REM //Note: 
	REM //Note: #### Última linha que deve a ser executada nesse arquivo!!!! ####
	REM //Note: 
	REM //Note: Faz-se necessário retornar o "encodamento" para "28591", pois caso contrário podem haver impactos negativos em outras páginas ASP! By Questor
	Session.CodePage = 28591
	
	
%>
