  json.extract! message, 
    :id, 
    :author_id,
    :content, 
    # :location_type, 
    # :location_id, 
    :created_at,
    :pinned,
    :edited
    #we also want the author's name. what's the proper way to do that?