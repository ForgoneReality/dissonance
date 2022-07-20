class ServerRoleJoin < ApplicationRecord

    validates :server_join_id, :role_id, presence: true
    validates :server_join_id, :uniqueness => { :scope => :role_id}

    belongs_to: :server_join, class_name: "ServerJoin", foreign_key: :server_join_id
    belongs_to: :role, class_name: "Role", foreign_key: :role_id
end
