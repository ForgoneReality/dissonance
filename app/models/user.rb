class User < ApplicationRecord
    # attr_accessor :last_login
    attr_reader :password

    # before_validation :init_last_login

    after_initialize :ensure_session_token

    validates :email, presence: true, uniqueness: true, length: {maximum: 50}
    validates :session_token, presence: true, uniqueness: true
    validates :password_digest, :username, presence: true
    validates :password, length: { minimum: 6, maximum: 64 }, allow_nil: true
    validates :username, uniqueness: { scope: :fourdigit_id }, length: {maximum: 32}
    before_save :has_profile_picture
    validates :bio, length: {maximum: 64}

    validates :status, presence: true, inclusion: { in: %w(online idle busy offline)}
    validates :fourdigit_id, presence: true, format: { with: /\A[+-]?\d+\z/}, length: {is: 4}

    # def init_last_login
    #     self.last_login = Time.current;
    # end

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)

        if user && user.is_password?(password)
            return user
        end

        return nil
    end

    def password=(password)
        @password = password
        
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        self.session_token = SecureRandom.urlsafe_base64
        self.save!
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64
    end

    def has_profile_picture
        if !self.profile_picture.attached?
            num = rand(1..10).to_s
            filelocation = "app/assets/images/#{num}.png"
            filename = "#{num}.png"
            self.profile_picture.attach(io: File.open(filelocation), filename: filename)

            if !self.profile_picture.attached?
                errors.add(:profile_picture, "failed to attach default profile picture") 
            end
        end 
    end

    # def has_profile_picture
    #     if !self.profile_picture.attached?
    #         num = rand(1...8).to_s
    #         filelocation = "app/assets/images/#{num}.png"
    #         filename = "#{num}.png"
    #     end
    #     image = MiniMagick::Image.open(filelocation)
    #     image.resize "128x128!"
    #     image.write "resized-#{filename}"

    #     self.profile_picture.attach(io: File.open(filelocation), filename: filename)
    #     if !self.profile_picture.attached?
    #         errors.add(:profile_picture, "failed to attach default profile picture") 
    #     end

    # end


    has_many :friendships, 
        class_name: "Friendship", 
        foreign_key: :user_id

    has_many :friends, through: :friendships, source: :friend

    has_many :servers_joined, 
        class_name: "ServerJoin",
        foreign_key: :user_id,
        primary_key: :id

    has_many :servers, through: :servers_joined, source: :server

    has_many :servers_owned, class_name: "Server", primary_key: :id, foreign_key: :owner_id

    has_many :messages, foreign_key: :author_id, class_name: "Message"

    def conversations
        Conversation.joins("INNER JOIN users ON users.id = conversations.user1_id OR users.id = conversations.user2_id").where("users.id = #{self.id}").uniq
    end

    has_one_attached :profile_picture
    
end
