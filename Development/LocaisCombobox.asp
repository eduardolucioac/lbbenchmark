<%
	
	REM //Note: Útil para debug! By Questor
	REM response.write "rodou!"
	
%>

<%
	
	
	REM //Note: 
	REM //Note: #### Primeira linha que deve a ser executada nesse arquivo!!!! ####
	REM //Note: 
	REM //Note: Permite exibir caracteres latinos de forma correta tanto na hora de setar as variáveis de sessão. Isso nas operações que não envolvem retorno para o JavaScript! By Questor
	Session.CodePage = 28591
	
	
	REM //Note: Variáveis gerais do código! By Questor
	dim errorOutPut
	errorOutPut = ""
	dim stillRunning
	stillRunning = true
	
	
	REM //Note: Controla a execução! By Questor
	if CreateLocaisCombobox() then
		
	end if
	
	
	REM //Note: ! By Questor
	function CreateLocaisCombobox()
		
		
		REM //Note: ! By Questor
		if Application("LocaisCombobox") = "" OR Application("LocaisCombobox") = "UPDATE" then
			
			REM //Note: Verifica se o objeto LBCOM foi criado! By Questor
			set objLBWSession = CreateObject("LBCOM.LBCOM_Session.1")
			if objLBWSession is nothing then
				stillRunning = false
				errorOutPut = errorOutPut & "Não foi possível criar uma instância do objeto LBCOM!   "
			end if
			
			
			REM //Note: Verifica se é possível a conexão com o banco LBW! By Questor
			if stillRunning then
				if not objLBWSession.Login("lbw", "lbw", "DEFUDB", "LOCALHOST") then
					stillRunning = false
					errorOutPut = errorOutPut & "Não foi possível fazer login no banco de dados LBW!   "
				end if
			end if
			
			
			REM //Note: Verifica se a base "GOLDEN_USERS" pode ser aberta! By Questor
			if stillRunning then
				set objLBWBase = objLBWSession.OpenBase("GOLDEN_USERS", false, true)
				if objLBWBase is nothing then
					stillRunning = false
					errorOutPut = errorOutPut & "Não foi possível abrir a base de dados ""GOLDEN_USERS""!   "
				end if
			end if
			
			
			if stillRunning then
					
				REM //Note: Verifica se a pesquisa foi bem sucedida! By Questor
				if not objLBWBase.RunQuery("""GROUP""[GoldenType] NÃO 1[disabled]") then
					errorOutPut = errorOutPut & "Não foi possível executar a pesquisa """"GROUP""[GoldenType] NÃO 1[disabled]"" na base de dados ""GOLDEN_USERS""!   "
					stillRunning = false
				else
					if stillRunning then
						objLBWBase.Sort("nome>")
						selectOutPut = "<option value=""EMPTY"">...</option>" & vbCrLf & "<option value=""ROOT"">[É RAIZ]</option>" & vbCrLf
						do						
							selectOutPut = selectOutPut & "<option value=""" & objLBWBase.FieldByName("login").String & """>" & objLBWBase.FieldByName("nome").String & "</option>" & vbCrLf
						loop until (not objLBWBase.NextRecord())
					end if
				end if
				
			end if
			
			
			REM //Note: Fecha conexões LBW e "destrói" objetos correlatos! By Questor
			if IsObject(objLBWBase) and IsObject(objLBWSession) then
				objLBWBase.Close()
				set objLBWBase = nothing
				objLBWSession.Logout()
				set objLBWSession = nothing
			end if
			
			
			REM //Note: Destrava o objeto "Application" para gravar a variável global e estática "LocaisCombobox"! By Questor
			Application.Lock
			
			
			if not stillRunning then
				REM //Note: Em caso de erro na pesquisa por registros na base (sistema) empresas, retorna um select "padrão"! By Questor
				Application("LocaisCombobox") = "<option value=""VAZIO"">...</option>" & vbCrLf
			else
				Application("LocaisCombobox") = selectOutPut
			end if
			
			
			REM //Note: Trava o objeto "Application" para evitar interferências indesejadas na variável global e estática "LocaisCombobox"! By Questor
			Application.Unlock
			
			
		end if
		
		CreateLocaisCombobox = stillRunning
		
	end function
	
	
	REM //Note: Permite exibir caracteres latinos de forma correta quando esses valores são recuperados pelo JavaScript! By Questor
	Response.Charset = "UTF-8"
	Session.CodePage = 65001
	
	
	REM //Note: Verifica se há erros. Se houver, exibe texto com o erro na página ASP! By Questor
	if errorOutPut <> "" then
		
		response.write "ASP_ERROR_COD" & errorOutPut
		
	else
		
		response.write Application("LocaisCombobox")
		
		
		REM //Note: Quando estiver "debugando" permite forçar um update do combobox guardado em "Application("LocaisCombobox")"! By Questor
		REM Application("LocaisCombobox") = "UPDATE"
		
		
	end if
	
	
	REM //Note: 
	REM //Note: #### Última linha que deve a ser executada nesse arquivo!!!! ####
	REM //Note: 
	REM //Note: Faz-se necessário retornar o "encodamento" para "28591", pois caso contrário podem haver impactos negativos em outras páginas ASP! By Questor
	Session.CodePage = 28591
	
	
%>
