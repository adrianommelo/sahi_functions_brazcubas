//para passar como parâmetro nas chamadas às funções
$urls = new Array();
$urls['production'] = 'http://ava.brazcubas.br/';
$urls['tester'] = 'http://54.207.51.47/BETA/';


function populateGabaritoDanteWithCSV($csvFile,$courseNameColumn,$dataColumn,$semesterColumn,$initFirstTemplate){
  $questionValue=1;
  $gabaritoCSV =_readCSVFile($csvFile,';',true);

  for ($i = 1; $i < $gabaritoCSV.length; $i++) {
//botááo adicionar
_click(_submit("voltar"));
//2º semestre de 2014
_setSelected(_select("plet_in_id[1]"), $gabaritoCSV[$i][$semesterColumn]);
//grupo 1
_setSelected(_select("hgru_in_id[1]"), 4);
//buscar disciplina
_setSelected(_select("dis_in_id[1]"),$gabaritoCSV[$i][$courseNameColumn]);
//colocar data conforme planilha
//pegando a data e separando
$date = $gabaritoCSV[$i][$dataColumn];
$dateArray=$date.split("/");

_click(_textbox("dt_aplicacao"));
_setValue(_textbox("dt_aplicacao"), "__/__/"+$dateArray[2]);
_setValue(_textbox("dt_aplicacao"), $dateArray[0]+"/__/"+$dateArray[2]);
_setValue(_textbox("dt_aplicacao"), $dateArray[0]+"/"+$dateArray[1]+"/"+$dateArray[2]);
_wait(2500);
_click(_cell("Gravar"));
_click(_cell("Gravar"));
$dateArray.length=0;
$date ='';

while($questionValue<9)
{
  //gabarito
  $secondIndex = $questionValue+$initFirstTemplate;
  _setValue(_textbox('r'+$questionValue), $gabaritoCSV[$i][$secondIndex]);

//valor de cada questão
switch($questionValue)
{
  case 1:
  case 2:
  case 3:
  case 4:
  case 5:
  _setValue(_textbox("p"+$questionValue), 100);
  break;
  case 6:
  case 7:
  _setValue(_textbox("p"+$questionValue), 150);
  break;
  case 8:
  _setValue(_textbox("p"+$questionValue), 200);
  break;
}
$questionValue +=1;
_click(_submit("gravar"));
}
$questionValue =1;
}
}

function sendMessagePerStudent($arrayEmails,$defaultMessage,$str_url)
{
  $emails = $arrayEmails;

  for ($i = 0; $i < $emails.length; $i++) {
   _navigateTo($urls[$str_url]+'user/index.php?id=1&search='+encodeURIComponent($emails[$i]));
   if(_count('_cell',"/.*/",_in(_table(1))) >1)
   {
    _click(_checkbox('usercheckbox',_in(_cell('user-index-participants-1_r0_c0', _in(_row(2))))));
    _setSelected(_select("formaction"),1);
    _rteWrite(_iframe('edit-messagebody_ifr'),$defaultMessage);
    _click(_submit("preview"));
    _click(_submit("send"));
  }
  else
  {
    $notFoundEmails.push($emails[$i]);
    continue;
  }
}
}

function setShowTopicUnit($objectListCourses,$sesskey,$topic,$str_url)
{
    if(_exists(_submit("Ativar edição")))
    {
     _click(_submit("Ativar edição"));
    }
    _wait(1000);
  for ($i = 0; $i < $objectListCourses.length; $i++)
  {
    _navigateTo($urls[$str_url]+'course/view.php?id='+$objectListCourses[$i].ava+'&sesskey='+$sesskey+'&show='+$topic);
    _wait(2500);
  }
}

function removeAulaUBC_SyncApp($arrayListVideoAulaName)
{
  if($arrayListVideoAulaName ==undefined||$arrayListVideoAulaName.length<=0)
  {
    _alert('array vazia ou com número de elementos igual a zero');
    _stop();
  }
  else
  {
    for (var $n=0; $n< $arrayListVideoAulaName.length; $n++) {
      _navigateTo("http://brazcubas-sync-app.herokuapp.com/arquivo");
      _setValue(_textbox("nome"), $arrayListVideoAulaName[$n]);
      _click(_submit("Buscar"));

      if(_exists(_table('table table-condensed table-bordered table-striped')))
      {
       _click(_link("Excluir"));
       _wait(1000);
       _click(_link("excluirLink"));
       _wait(1000);
     }
   }
 }

}

//====================================================
//Função para Acesso nos AVAs e uncheck nos permissões de Revisão das atividades
//
//Array com ID das disciplinas a serem acessadas
$disciplinasID = new Array({ava:1457}, {ava:1483}, {ava:1309}, {ava:1499}, {ava:1282}, {ava:1357}, {ava:1348}, {ava:1312}, {ava:1313}, {ava:1461}, {ava:1346}, {ava:1454}, {ava:1485}, {ava:1418}, {ava:1302}, {ava:1305}, {ava:1361}, {ava:1318}, {ava:1481}, {ava:1422}, {ava:1333}, {ava:1386}, {ava:1388}, {ava:1458}, {ava:1489}, {ava:1280}, {ava:1278}, {ava:1491}, {ava:1492}, {ava:1306}, {ava:1469}, {ava:1438}, {ava:1334}, {ava:1463}, {ava:1470}, {ava:1364}, {ava:1495}, {ava:1500}, {ava:1479}, {ava:1439}, {ava:1507}, {ava:1442}, {ava:1387}, {ava:1437}, {ava:1327}, {ava:1515}, {ava:1353}, {ava:1509}, {ava:1360}, {ava:1365}, {ava:1496}, {ava:1407}, {ava:1329}, {ava:1474}, {ava:1343}, {ava:1384}, {ava:1440}, {ava:1320}, {ava:1443}, {ava:1424}, {ava:1326}, {ava:1425});

//chamando a Função de acesso aos AVAs da array
//'ava' seria o nome da propriedade utilizada em seu array

//$str_url= 'production' or 'tester'

acessaAVA($disciplinasID,'ava','tester');

function acessaAVA($id_AVAS, $nomepropriedade, $str_url)
{
  //$url = "http://ava.brazcubas.br/course/view.php?id=";
  //$url = "http://54.207.51.47/BETA/course/view.php?id=";
  for(var $posicao in $id_AVAS)
  {
    //verificação se dentre o indice da propriedade ava não é string, se não for
    //ele pega e concatena na url do ava que queremos acessar
    _navigateTo($urls[$str_url]+'course/view.php?id='+$id_AVAS[$posicao][$nomepropriedade]);

    _wait(5000);
    //chama função que desabilita Revisão <<<<<<~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    retiraRevisao();

  };
};

function retiraRevisao()
{
  //busca todos os questionário cadastrados, no AVA atual
  $collect = _collect('_span','/.* Questionário/', _in(_div('region-content')));

  for ($i = 0; $i < $collect.length; $i++)
  {
    //verificando se o modo edição está ativado na pagina do ava atual
    if(_exists(_submit("Ativar edição")))
    {
      _click(_submit("Ativar edição"));
      _wait(1000);
    }

    //acessa a url do span atual
    _click(_parentNode($collect[$i]));
    _wait(3000);
    _click(_link("Editar configurações"));
    _wait(3000);
    //expande tudo
    _click(_link("Expandir tudo"));
    _wait(500);

    //em opções de revisão
    //uncheck na revisão, exibindo somente nota
    _uncheck(_checkbox("id_attemptclosed"));
    _uncheck(_checkbox("id_correctnessclosed"));
    _uncheck(_checkbox("id_specificfeedbackclosed"));
    _uncheck(_checkbox("id_generalfeedbackclosed"));
    _uncheck(_checkbox("id_rightanswerclosed"));
    _uncheck(_checkbox("id_overallfeedbackclosed"));
    //_uncheck();



    //salvando mudanças
    _click(_submit("Salvar e voltar ao curso"));
    _wait(1000);
  };

};

