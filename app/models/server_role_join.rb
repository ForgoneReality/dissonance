class ServerRoleJoin < ApplicationRecord

    validates :serverjoin_id, :role_id, presence: true
    validates :serverjoin_id, :uniqueness => { :scope => :role_id}

    belongs_to: :server_join, class_name: "ServerJoin", foreign_key: :serverjoin_id
    belongs_to: :role, class_name: "Role", foreign_key: :role_id
end
