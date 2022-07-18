require 'test_helper'

class ApiControllerTest < ActionDispatch::IntegrationTest
  test "should get Message" do
    get api_Message_url
    assert_response :success
  end

end
