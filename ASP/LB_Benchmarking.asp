<script language=jscript runat=server> 
function GetTime() 
{ 
	var d = new Date(); 
	return d.getTime(); 
} 
</script>
<%
	
	
	REM This program is free software: you can redistribute it and/or modify
	REM it under the terms of the GNU General Public License as published by
	REM the Free Software Foundation, either version 3 of the License, or
	REM (at your option) any later version.
	
	REM This program is distributed in the hope that it will be useful,
	REM but WITHOUT ANY WARRANTY; without even the implied warranty of
	REM MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	REM GNU General Public License for more details.
	
	REM You should have received a copy of the GNU General Public License
	REM along with this program.  If not, see <http://www.gnu.org/licenses/>.
	
	
	dim startTimeTotal, endTimeTotal
	
	startTimeTotal = GetTime()
	
	dim startTime, endTime
	
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
	set base_DOCS_RECEBIDOS = nothing
	set LBWSession = nothing
	
	REM //Note: Controla a execução! By Questor
	if ValidateAjaxValues() then
		if TreatInputAttributes() then
			if LBComProcesses() then
				if Benchmarking_LB() then
				end if
			end if
		end if
	end if
	
	
	REM //Note: Recupera os valores da chamada ajax e valida! By Questor
	function ValidateAjaxValues()
		
		if request.form("fieldServer") = "" or request.form("fieldUDB") = "" or request.form("fieldBase") = "" or request.form("fieldUser") = "" or request.form("fieldPassword") = "" or request.form("fieldQueryTest") = "" then
			stillRunning = false
			errorOutPut = errorOutPut & "Error! A necessary information to perform the operation is missing!   "
		end if
		
		
		REM //Note: Para debug! By Questor
		ValidateAjaxValues = stillRunning
		
	end function
	
	REM //Note: Trata os valores de entrada! By Questor
	function TreatInputAttributes()
		
		TreatInputAttributes = stillRunning
		
	end function
	
	
	REM //Note: Intancia e loga no BD LightBase para fazer a gravação do registro! By Questor
	function LBComProcesses()
		
		on error resume next
			REM //Note: Loga na base "DOCS_RECEBIDOS". By Questor
			set LBWSession = CreateObject("LBCOM.LBCOM_Session.1")
			if LBWSession is nothing then
				stillRunning = false
				errorOutPut = errorOutPut & "Error! Unable to create a session with the LightBase!   "
			end if
		if Err.Number <> 0 then
			stillRunning = false
			errorOutPut = errorOutPut & "Error! Unable to create a session with the LightBase! Err.Description: " & Err.Description & "    "
		end if
		on error goto 0
		
		if stillRunning then
			on error resume next
				REM If Not LBWSession.Login("lbw", "lbw", "DEFUDB", "LOCALHOST") Then
				If Not LBWSession.Login(request.form("fieldUser"), request.form("fieldPassword"), request.form("fieldUDB"), request.form("fieldServer")) Then
					stillRunning = false
					errorOutPut = errorOutPut & "Error! Unable to log in LightBase!   "
				End If
			if Err.Number <> 0 then
				stillRunning = false
				errorOutPut = errorOutPut & "Error! Unable to log in LightBase! Err.Description: " & Err.Description & "    "
			end if
			on error goto 0
		end if
		
		if stillRunning then
			on error resume next
				REM Set base_DOCS_RECEBIDOS = LBWSession.OpenBase("DOCS_RECEBIDOS", False, False)
				Set base_DOCS_RECEBIDOS = LBWSession.OpenBase(request.form("fieldBase"), False, False)

				if base_DOCS_RECEBIDOS is nothing then
					stillRunning = false
					errorOutPut = errorOutPut & "Error! Unable to open the """ & request.form("fieldBase") & """ database!   "
				end if
			if Err.Number <> 0 then
				stillRunning = false
				errorOutPut = errorOutPut & "Error! Unable to open the """ & request.form("fieldBase") & """ database! Err.Description: " & Err.Description & "    "
			end if
			on error goto 0
		end if
		
		LBComProcesses = stillRunning
		
	end function
	
	
	REM //Note: Completa a criação do "usuário" com os demais dados! By Questor
	function Benchmarking_LB()
		
		startTime = GetTime()
		
		on error resume next
			REM if not base_DOCS_RECEBIDOS.RunQuery("silva") then
			if not base_DOCS_RECEBIDOS.RunQuery(request.form("fieldQueryTest")) then
				stillRunning = false
				errorOutPut = errorOutPut & "Error! The query """ & request.form("fieldQueryTest") & """ is invalid or could not find records!   "
			end if
		if Err.Number <> 0 then
			stillRunning = false
			errorOutPut = errorOutPut & "Error! The query """ & request.form("fieldQueryTest") & """ is invalid or could not find records! Err.Description: " & Err.Description & "    "
		end if
		on error goto 0
		
		endTime = GetTime()
		
		Benchmarking_LB = stillRunning
		
	end function
	
	on error resume next
	if not base_DOCS_RECEBIDOS is nothing and not LBWSession is nothing then
		if IsObject(base_DOCS_RECEBIDOS) and IsObject(LBWSession) then
			base_DOCS_RECEBIDOS.Close()
			LBWSession.Logout()
			set base_DOCS_RECEBIDOS = nothing
			set LBWSession = nothing
		end if
	end if
	if Err.Number <> 0 then
			stillRunning = false
			errorOutPut = errorOutPut & "Error! Failed to try to free resources of the database! Err.Description: " & Err.Description & "    "
	end if
	on error goto 0
	
	REM //Note: Permite exibir caracteres latinos de forma correta quando esses valores são recuperados pelo JavaScript! By Questor
	Response.Charset = "UTF-8"
	Session.CodePage = 65001
	
	
	REM //Note: Verifica se há erros. Se houver, exibe texto com o erro na página ASP! By Questor
	if errorOutPut <> "" then
		
		response.write "ASP_ERROR_COD" & errorOutPut

	else
		
		endTimeTotal = GetTime()
		response.write Cstr(endTime - startTime) & "$" & Cstr(endTimeTotal - startTimeTotal)
		
	end if
	
	
	REM //Note: 
	REM //Note: #### Última linha que deve a ser executada nesse arquivo!!!! ####
	REM //Note: 
	REM //Note: Faz-se necessário retornar o "encodamento" para "28591", pois caso contrário podem haver impactos negativos em outras páginas ASP! By Questor
	Session.CodePage = 28591
		
%>
