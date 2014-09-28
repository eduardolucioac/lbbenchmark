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
	dim LBWSession
	dim base_DOCS_RECEBIDOS

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
			errorOutPut = errorOutPut & "Erro! Uma informação necessária para executar a operação está ausente!   "
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
		
		REM //Note: Loga na base "DOCS_RECEBIDOS". By Questor
		set LBWSession = CreateObject("LBCOM.LBCOM_Session.1")
		if LBWSession is nothing then
			stillRunning = false
			errorOutPut = errorOutPut & "Erro! Não foi possível criar a sessão com o LightBase!   "
		end if

		REM If Not LBWSession.Login("lbw", "lbw", "DEFUDB", "LOCALHOST") Then
		If Not LBWSession.Login(request.form("fieldUser"), request.form("fieldPassword"), request.form("fieldUDB"), request.form("fieldServer")) Then
			stillRunning = false
			errorOutPut = errorOutPut & "Erro! Não foi possível fazer o login no LightBase!   "
		End If

		REM Set base_DOCS_RECEBIDOS = LBWSession.OpenBase("DOCS_RECEBIDOS", False, False)
		Set base_DOCS_RECEBIDOS = LBWSession.OpenBase(request.form("fieldBase"), False, False)

		if base_DOCS_RECEBIDOS is nothing then
			stillRunning = false
			REM errorOutPut = errorOutPut & "Erro! Não foi possível abrir a base de dados (""DOCS_RECEBIDOS"")!   "
			errorOutPut = errorOutPut & "Erro! Não foi possível abrir a base de dados (""" & request.form("fieldBase") & """)!   "
		end if
		
		LBComProcesses = stillRunning
		
	end function
	
	
	REM //Note: Completa a criação do "usuário" com os demais dados! By Questor
	function Benchmarking_LB()
		
		startTime = GetTime()
		
		REM if base_DOCS_RECEBIDOS.RunQuery("silva") then
		if not base_DOCS_RECEBIDOS.RunQuery(request.form("fieldQueryTest")) then
			stillRunning = false
			errorOutPut = errorOutPut & "Erro! A query """ & request.form("fieldQueryTest") & """ é inválida ou não localizou registros!   "
		end if
		
		endTime = GetTime()
		
		Benchmarking_LB = stillRunning
		
	end function
	
	if IsObject(base_DOCS_RECEBIDOS) and IsObject(LBWSession) then
		
		base_DOCS_RECEBIDOS.Close()
		LBWSession.Logout()
		set base_DOCS_RECEBIDOS = nothing
		set LBWSession = nothing
		
	end if
	
	
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
