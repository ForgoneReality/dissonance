class Role < ApplicationRecord
    validates :name, presence: :true
    validates :color, presence: :true, inclusion: {in: ["#1ABC9C", "#2ECC71", "#3498DB", "#9B59B6", "#E91E63", "#F1C40F", "#E67E22", "#E74C3C", "#95A5A6", "#607D8B", "#11806A", "#1F8B4C",  "#206694", "#71368A", "#AD1457", "#C27C0E", "#A84300", "#992D22", "#979C9F", "#546E7A", "#96989D"]}
    validates :server_id, presence: true

    belongs_to :server, class_name: "Server", foreign_key: :server_id

    serialize :permissions, Array

    has_many :server_role_joins, class_name: "ServerRoleJoin", foreign_key: :role_id
    has_many :server_joins, through: :server_role_joins, source: :server_join
    has_many :users, through: :server_joins, source: :user
end
