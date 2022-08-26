class ServerRoleJoin < ApplicationRecord

    validates :server_join_id, :role_id, presence: true
    validates :server_join_id, :uniqueness => { :scope => :role_id}

    validate :same_server

    def same_server
        sj = ServerJoin.find_by({id: self.server_join_id})
        r = Role.find_by({id: self.role_id})

        if(sj.server_id != r.server_id)
            errors[:base] << 'Server IDs are not matching!'
        end
    end

    belongs_to :server_join, class_name: "ServerJoin", foreign_key: :server_join_id
    belongs_to :role, class_name: "Role", foreign_key: :role_id
end
