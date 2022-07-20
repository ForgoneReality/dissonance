class Role < ApplicationRecord
    validates :name, presence: :true
    validates :color, presence: :true
    validates :server_id, presence: true

    belongs_to :server, class_name: "Server", foreign_key: :server_id

    has_many :server_role_joins, class_name: "ServerRoleJoin", foreign_key: :role_id
    has_many :server_joins, through: :server_role_joins, source: :server_join
end
