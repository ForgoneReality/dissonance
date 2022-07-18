@conversations.each do |conversation|
    json.conversation do
      json.set! conversation.id do
        # json.partial! 'api/conversations/convos', conversation: conversation
        json.participants do
          json.set! conversation.user1_id do
              json.partial! 'api/conversations/usershort', user: conversation.user1
          end

          json.set! conversation.user2_id do
              json.partial! 'api/conversations/usershort', user: conversation.user2
          end
        end
      end
    end
end