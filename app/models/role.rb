class Role < ApplicationRecord
    validates :name, presence: :true
    validates :color, presence: :true
    validates :server_id, presence: true

    belongs_to :server, class_name: "Server", foreign_key: :server_id

    belongs_to :serverJoin, class_name: "ServerJoin", foreign_key: :role_id
    has_many :userRoleJoin, class_name: "UserRoleJoin", foreign_key: :user_id
end
