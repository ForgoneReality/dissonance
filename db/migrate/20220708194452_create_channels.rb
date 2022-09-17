class CreateChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :channels do |t|
      t.string :name, null: false
      t.string :description
      t.integer :server_id, null: false
      t.integer :temp, null: false, default: 0 #temporary code until ServerRoleJoin is complete and roles have permissionso
      t.timestamps
    end
    add_index :channels, :server_id
    add_index :channels, [:name, :server_id], unique: true
  end
  
end
