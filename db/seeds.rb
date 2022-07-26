require 'open-uri'

User.destroy_all
System.destroy_all
Tide.destroy_all

u = User.new(
  email: "tobias.ramalho@marinha.mil.br",
  username: "noronha",
  password: "pesquisa",
  admin: false
)
u.save!


s= System.new(
  name: "almirantado_int",
  buoy_id: 29, 
  lat: "-28.350550", 
  lon: "-48.650133"
)
s.save!

s= System.new(
    buoy_id: 1040,
    name: "SBJV",
    lat: "-26.2245",
    lon: "-48.7974"
)
s.save!

s= System.new(
  buoy_id: 1024,
  name: "SBFL",
  lat: "-27.6705",
  lon: "-48.5472"
)
s.save!

s= System.new(
    buoy_id: 1056,
    name: "SBNF",
    lat: "-26.88",
    lon: "-48.6514"
)
s.save!

s= System.new(
  name: "IMBITUBA",
  lat: "-28.2188888888889",
  lon: "-48.65",
  buoy_id: "54-porto_de_imbituba.pdf"
)
s.save!

s= System.new(
  name: "FLORIANÓPOLIS",
  lat: "-27.5841669444444",
  lon: "-48.5511111111111",
  buoy_id: "53-porto_de_florianopolis.pdf"
)
s.save!

s= System.new(
  name: "ITAJAÍ",
  lat: "-26.9016669444444",
  lon: "-48.6505561111111",
  buoy_id: "52-porto_de_itajai.pdf"
)
s.save!

s= System.new(
  name: "SÃO FRANCISCO DO SUL",
  lat: "-26.2352780555556",
  lon: "-48.6344438888889",
  buoy_id: "51-porto_de_sao_francisco_do_sul.pdf"
)
s.save!