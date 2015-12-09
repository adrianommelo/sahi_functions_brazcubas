//acessar comunidades e colocar nome dos tópicos

$communitiesFirstBlock=[10932,10952,10934,10899,10990,10905,10906,10900,10907,10908,10909,10901,10902,10910,10944,10911,10912,10903,10913,10914,10915,10916,10917,10918,10904,10919,10920,10921,10922,10923,10924,10925,10926,10927,10928,10929,10930,10931,10933,10935,10936,10937,10938,10939,10940,10941,10942,10943,10945,10946,10947,10948,10949,10950,10951,10953,10954,10955,10956,10957,10958,10959,10960,10961,10962,10963,10964,10965,10966,10967,10968,10969,10970,10971,10972,10973,10991,10974,10975,10976,10977,10978,10979,10980,10981,10982,10983,10984,10985,10986,11902,13403,13404,13405,13402,13406,13407,13408,13409,13410,13411,13412,13413,13414,13415,13416,13417,13418,13419,13420,13421,13422,13423,13424,13425,13426,13427,13428,13429,13430,14289,14290,14291,14292,14293,14294,14282,14283,14295,14296,14297,14342,14341,14298,14299,14300,14334,14301,14302,14303,14304,14305,14306,14307,14339,14308,14343,14309,14310,14311,14312,14313,14314,14315,14316,14317,14318,14319,14320,14321,14322,14403,14323,14324,14325,14340,14326,14327,14284,14328,14288,14329,14330,14331,14332,14333,14426,14286,14429,14335,14336,14337,14338,14344,14345,14411,14412,14346,14432,14433,14350,14351,14352,14407,14353,14354,14355,14356,14347,14357,14358,14408,14359,14360,14361,14362,14363,14364,14365,14402,14366,14367,14368,14369,14370,14349,14371,14372,14373,14374,14375,14376,14377,14405,14378,14379,14380,14409,14404,14381,14382,14348,14383,14384,14385,14386,14387,14388,14389,14390,14410,14406,14391,14392,14393,14394,14395,14396,14397,14398,14399,14400,14401,14413,14414,14415,14434,14431,14430,14416,14417,14418,14419,14420,14421,14422,14423,10992,14285,14424,14425,14427,14428,11301,11302,14287,13431,11901,14525,14526,14527,14528,14529,14530,14531,14532,14533,14534,14535/*145361*/];

$idacessado = new Array();
$topicos = new Array();


function quickEnroll($id)
{
	try
	//if(_exists(_link("Matrícula Rápida")))
	{
		_click(_link("Matrícula Rápida"));
		_wait(1000);
	}
	catch($e){
		_log($e);
		_log($id + " - Não fez Matrícula rapida");
	}
}

function linkForunsExistentes(){

	for ($i = 0; $i < $communitiesFirstBlock.length; $i++) {
		//_navigateTo("https://brazcubas.blackboard.com/webapps/discussionboard/do/conference?toggle_mode=edit&action=list_forums&course_id=_"+$communitiesFirstBlock[$i]+"_1&nav=discussion_board_entry&mode=cpview");
		
		_navigateTo("https://brazcubas.blackboard.com/webapps/blackboard/execute/courseMain?course_id=_"+$communitiesFirstBlock[$i]+"_1");
		
		quickEnroll($communitiesFirstBlock[$i]);	//faz matrícula rapida

		_click(_link("Fóruns"));

		//faz um collect nos fóruns existentes, e pega os links de cada um
		$nomeForum = _collect('_link','/Fórum de D.*/',_in(_div('listContainer')));

		$urlForum = [];
		for($posicao in $nomeForum){
			$urlForum[$posicao] = String(_getAttribute(_link($nomeForum[$posicao]),'href'));
		}

		if ($urlForum == 0){
			$idacessado.push($communitiesFirstBlock[$i] + " - sem fórum")
			continue;
		}

		for ($url in $urlForum){
			_navigateTo($urlForum[$url]);
			coletaTopicos($communitiesFirstBlock[$i]);

		};
	};
}

function coletaTopicos($idAtual){
	$coletaDadosTopicosExistentes = _collect('_span','/Tópico de.*/',_in(_div('listContainer')));
	$statusTopico = _collect('_span','/(Bloqueado|Publicado)/',_in(_div('listContainer')));

	for (var $count in $coletaDadosTopicosExistentes) {
		var $nome = _getText($coletaDadosTopicosExistentes[$count]);
		var $status = _getText($statusTopico[$count]);

		$topicos.push({id: $idAtual, nomeTopico: $nome, status: $status});	

	};
}


function exibeColeta(){
	var $msgPubli = "";
	var $msgBloq = "";
	var $msgOutros = "";

	for(var $tamanho in $topicos){
		switch($topicos[$tamanho].status){
			case "Bloqueado":
				$msgBloq  += "ID: " + $topicos[$tamanho].id + " Nome: " + $topicos[$tamanho].nomeTopico + " Status: " + $topicos[$tamanho].status + "<br>"
			break;
			
			case "Publicado":
				$msgPubli  += "ID: " + $topicos[$tamanho].id + " Nome: " + $topicos[$tamanho].nomeTopico + " Status: " + $topicos[$tamanho].status  + "<br>"
			break;
			
			default:
				$msgOutros  += "ID: " + $topicos[$tamanho].id + " Nome: " + $topicos[$tamanho].nomeTopico + " Status: " + $topicos[$tamanho].status + "<br>"
		}
	}

	_log("Fórums BLOQUEADOS: "+ $msgBloq);
	_log("Fórums PUBLICADOS: "+ $msgPubli);
	_log("Fórums OUTROS: "+ $msgOutros);
}



//
//Chamada das funções
linkForunsExistentes();
exibeColeta();
