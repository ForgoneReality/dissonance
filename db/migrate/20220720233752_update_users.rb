class UpdateUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :last_login
    add_column :users, :last_login, :integer, null: false, default: Time.current
    remove_column :conversations, :last_updated
    add_column :conversations, :last_updated, :integer, null: false, default: Time.current
  end
end
