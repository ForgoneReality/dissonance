class CreateRoles < ActiveRecord::Migration[5.2]
  def change
    create_table :roles do |t|
      t.string :name, null: false
      t.string :color, default: "#96989D", null: false
      t.integer :server_id, null: false
      t.text :permissions
      t.timestamps
      
    end
    add_index :roles, :server_id
  end
end