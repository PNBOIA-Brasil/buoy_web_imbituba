class CreateTides < ActiveRecord::Migration[6.0]
  def change
    create_table :tides do |t|
      t.datetime :date_time
      t.float :elev
      t.timestamps
    end
  end
end
