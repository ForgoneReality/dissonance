class ServerJoin < ApplicationRecord

    validates :user_id, :server_id, presence: true
    validates :user_id, :uniqueness => { :scope => :server_id} 

    belongs_to :user, foreign_key: :user_id, class_name: "User"
    belongs_to :server, foreign_key: :server_id, class_name: "Server"

    has_many :server_role_joins, class_name: "ServerRoleJoin", foreign_key: :server_join_id
    has_many :roles, through: :server_role_joins, source: :role
end
