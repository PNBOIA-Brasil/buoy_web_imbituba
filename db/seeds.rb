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
  buoy_id: 28, 
  lat: "-3.7983416", 
  lon: "-32.371525"
)
s.save!


s= System.new(
  name: "almirantado_ext",
  buoy_id: 28, 
  lat: "-3.833902", 
  lon: "-32.401730"
)
s.save!
 

tables = CSV.parse(File.read("db/prevista.csv"), headers: true, :col_sep => "\t")

tables.each do |row|
  u = Tide.new(
    date_time: DateTime.strptime("#{row['date']} #{row['time']}", '%d/%m/%Y %H:%M'),
    elev: row['elev'].downcase,
  )
  u.save!
end