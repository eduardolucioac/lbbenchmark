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
	dim LBWSession
	dim base_GOLDEN_USERS
	
	
	REM //Note: Guarda os parâmetros ajax! By Questor
	dim completeGroupRegistrationValues
	completeGroupRegistrationValues = ""
	
	
	REM //Note: Guarda os valores a serem submetidos no banco! By Questor
	redim valuesToSubmit(7)
	
	
	REM //Note: Guarda o caminho do local dentro da hierarquia! By Questor
	dim pathInTheHierarchy
	
	
	REM //Note: Controla a execução! By Questor
	if RetrievesAjaxValuesAndValidate() then
		if TreatInputAttributes() then
			if LBComProcesses() then
				if GetHierarchy() then
					if CompleteGroupRegistration() then
					end if
				end if
			end if
		end if
	end if
	
	
	REM //Note: Recupera os valores da chamada ajax e valida! By Questor
	function RetrievesAjaxValuesAndValidate()
		
		completeGroupRegistrationValues = request.form("completeGroupRegistrationValues")
		
		if completeGroupRegistrationValues = "" then
			stillRunning = false
			errorOutPut = errorOutPut & "Erro! Uma informação necessária para executar a operação está ausente!   "
		end if
		
		
		REM //Note: Para debug! By Questor
		REM completeGroupRegistrationValues = "login#20130627155512723;sigre#654321;pailocal#20130624154507504"
		
		RetrievesAjaxValuesAndValidate = stillRunning
		
	end function
	
	
	REM //Note: Trata os valores de entrada! By Questor
	function TreatInputAttributes()
		
		dim listInputValues
		listInputValues = Split(completeGroupRegistrationValues, ";")
		
		dim position
		position = 0
		for each listInputValue in listInputValues
			valuesToSubmit(Cint(position)) = Split(listInputValue, "#")(0)
			valuesToSubmit(Cint(position + 1)) = Split(listInputValue, "#")(1)
			position = position + 2
		next
		
		TreatInputAttributes = stillRunning
		
	end function
	
	
	REM //Note: Intancia e loga no BD LightBase para fazer a gravação do registro! By Questor
	function LBComProcesses()
		
		REM //Note: Loga na base "GOLDEN_USERS". By Questor
		set LBWSession = CreateObject("LBCOM.LBCOM_Session.1")
		if LBWSession is nothing then
			stillRunning = false
			errorOutPut = errorOutPut & "Erro! Não foi possível criar a sessão com o LightBase!   "
		end if

		If Not LBWSession.Login("lbw", "lbw", "DEFUDB", "LOCALHOST") Then
			stillRunning = false
			errorOutPut = errorOutPut & "Erro! Não foi possível fazer o login no LightBase!   "
		End If

		Set base_GOLDEN_USERS = LBWSession.OpenBase("GOLDEN_USERS", False, False)

		if base_GOLDEN_USERS is nothing then
			stillRunning = false
			errorOutPut = errorOutPut & "Erro! Não foi possível abrir a base de dados (""GOLDEN_USERS"")!   "
		end if
		
		LBComProcesses = stillRunning
		
	end function
	
	
	REM //Note: Obtém a hierarquia em que o grupo está! By Questor
	function GetHierarchy()
		
		if stillRunning then
			
			if valuesToSubmit(5) <> "ROOT" then
				
				if Not base_GOLDEN_USERS.RunQuery("""" & valuesToSubmit(7) & """[login]") then
					stillRunning = false
					errorOutPut = errorOutPut & "Erro! Problema na consulta do local pai (grupo)!   "
				end if
				
				base_GOLDEN_USERS.GotoRecord(1)
				
				pathInTheHierarchy = base_GOLDEN_USERS.FieldByName("diretorio").String(1) & "\" & valuesToSubmit(1)
				
			else
				
				pathInTheHierarchy = "\" & valuesToSubmit(1)
				
			end if
			
			GetHierarchy = stillRunning
			
		end if
		
	end function
	
	
	REM //Note: Completa a criação do "grupo" com os demais dados! By Questor
	function CompleteGroupRegistration()
		
		if Not base_GOLDEN_USERS.RunQuery("""" + valuesToSubmit(1) + """[login]") then
			stillRunning = false
			errorOutPut = errorOutPut & "Erro! Problema na consulta do local (grupo)!   "
		end if
		
		base_GOLDEN_USERS.GotoRecord(1)
		
		if Not base_GOLDEN_USERS.Lockrecord then
			stillRunning = false
			errorOutPut = errorOutPut & "Erro! Não foi possível ""travar"" o registro" & base_GOLDEN_USERS.Occurrences.Item(1).Term & "!   "
		end if
		
		if stillRunning then
			
			base_GOLDEN_USERS.FieldByName("sigre").String(1) = valuesToSubmit(3)
			
			base_GOLDEN_USERS.FieldByName("sigla").String(1) = valuesToSubmit(5)
			
			base_GOLDEN_USERS.FieldByName("diretorio").String(1) = pathInTheHierarchy
			base_GOLDEN_USERS.FieldByName("ler").String(1) = 1
			base_GOLDEN_USERS.FieldByName("editar").String(1) = 1
			base_GOLDEN_USERS.FieldByName("inserir").String(1) = 1
			base_GOLDEN_USERS.FieldByName("consultar").String(1) = 1
			base_GOLDEN_USERS.FieldByName("base").String(1) = "DOCS_RECEBIDOS"
			
			base_GOLDEN_USERS.FieldByName("diretorio").String(2) = pathInTheHierarchy
			base_GOLDEN_USERS.FieldByName("ler").String(2) = 1
			base_GOLDEN_USERS.FieldByName("editar").String(2) = 1
			base_GOLDEN_USERS.FieldByName("inserir").String(2) = 1
			base_GOLDEN_USERS.FieldByName("consultar").String(2) = 1
			base_GOLDEN_USERS.FieldByName("base").String(2) = "DOCS_EXPEDIDOS"
			
			if not base_GOLDEN_USERS.Saverecord() then
				stillRunning = false
				errorOutPut = errorOutPut & "Erro! Não foi possível gravar o registro " & base_GOLDEN_USERS.Occurrences.Item(1).Term & "! Você deverá refazer ou deletar esse grupo!   " & base_GOLDEN_USERS.ErrorDescription & i & base_GOLDEN_USERS.Records
			end if

			if Not base_GOLDEN_USERS.Releaserecord then
				stillRunning = false
				errorOutPut = errorOutPut & "Erro! Não foi possível ""destravar"" todos o registros " & base_GOLDEN_USERS.Occurrences.Item(1).Term & "! Podem haver problemas na consulta ao mesmo!   "
			end if
	
		end if
		
		
		REM //Note: Criar a pasta para o novo local criado dentro da hierarquia! By Questor
		if stillRunning then
		
			set fileSystemObjectHolder = CreateObject("Scripting.FileSystemObject")
			
			
			REM //Note: ! ! ! A T E N Ç Ã O ! ! ! Se o caminho para a pasta content modificar, vc terá que 
			REM //Note: atualizar aqui ! ! ! A T E N Ç Ã O ! ! ! By Questor
			dim contentPath
			contentPath = "C:\BR.Light\Data\DoCControl_Content\Recebidos\Content\" & pathInTheHierarchy & "\"
			
			if not fileSystemObjectHolder.FolderExists(contentPath) then
				if fileSystemObjectHolder.CreateFolder(contentPath) is nothing then
					stillRunning = false
					errorOutPut = errorOutPut & "Erro! Não foi possível criar a pasta referente ao novo local no caminho """ & contentPath & """!   "
				end if
			end if
			
			contentPath = "C:\BR.Light\Data\DoCControl_Content\Expedidos\Content\" & pathInTheHierarchy & "\"
			
			if not fileSystemObjectHolder.FolderExists(contentPath) then
			  if fileSystemObjectHolder.CreateFolder(contentPath) is nothing then
					stillRunning = false
					errorOutPut = errorOutPut & "Erro! Não foi possível criar a pasta referente ao novo local no caminho """ & contentPath & """!   "
				end if
			end if
		
		end if
		
		
		REM //Note: Seta a variável do tipo aplicação "LocaisCombobox" com o valor "UPDATE" para que o sistema atualize-a com um 
		REM //Note: novo local criado! By Questor
		if stillRunning then
			
			
			REM //Note: Destrava o objeto "Application" para gravar a variável global e estática "LocaisCombobox"! By Questor
			Application.Lock
			
			Application("LocaisCombobox") = "UPDATE"
			
			
			REM //Note: Trava o objeto "Application" para evitar interferências indesejadas na variável global e estática "LocaisCombobox"! By Questor
			Application.Unlock
			
		end if
		
		CompleteGroupRegistration = stillRunning
		
	end function
	
	if IsObject(base_GOLDEN_USERS) and IsObject(LBWSession) then
		
		base_GOLDEN_USERS.Close()
		LBWSession.Logout()
		
	end if
	
	
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
