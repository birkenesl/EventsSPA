defmodule EventsSpa.ResponsesTest do
  use EventsSpa.DataCase

  alias EventsSpa.Responses

  describe "responses" do
    alias EventsSpa.Responses.Response

    @valid_attrs %{analytical: 120.5, anger: 120.5, body: "some body", confident: 120.5, fear: 120.5, joy: 120.5, rating: 42, sadness: 120.5, tentative: 120.5}
    @update_attrs %{analytical: 456.7, anger: 456.7, body: "some updated body", confident: 456.7, fear: 456.7, joy: 456.7, rating: 43, sadness: 456.7, tentative: 456.7}
    @invalid_attrs %{analytical: nil, anger: nil, body: nil, confident: nil, fear: nil, joy: nil, rating: nil, sadness: nil, tentative: nil}

    def response_fixture(attrs \\ %{}) do
      {:ok, response} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Responses.create_response()

      response
    end

    test "list_responses/0 returns all responses" do
      response = response_fixture()
      assert Responses.list_responses() == [response]
    end

    test "get_response!/1 returns the response with given id" do
      response = response_fixture()
      assert Responses.get_response!(response.id) == response
    end

    test "create_response/1 with valid data creates a response" do
      assert {:ok, %Response{} = response} = Responses.create_response(@valid_attrs)
      assert response.analytical == 120.5
      assert response.anger == 120.5
      assert response.body == "some body"
      assert response.confident == 120.5
      assert response.fear == 120.5
      assert response.joy == 120.5
      assert response.rating == 42
      assert response.sadness == 120.5
      assert response.tentative == 120.5
    end

    test "create_response/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Responses.create_response(@invalid_attrs)
    end

    test "update_response/2 with valid data updates the response" do
      response = response_fixture()
      assert {:ok, %Response{} = response} = Responses.update_response(response, @update_attrs)
      assert response.analytical == 456.7
      assert response.anger == 456.7
      assert response.body == "some updated body"
      assert response.confident == 456.7
      assert response.fear == 456.7
      assert response.joy == 456.7
      assert response.rating == 43
      assert response.sadness == 456.7
      assert response.tentative == 456.7
    end

    test "update_response/2 with invalid data returns error changeset" do
      response = response_fixture()
      assert {:error, %Ecto.Changeset{}} = Responses.update_response(response, @invalid_attrs)
      assert response == Responses.get_response!(response.id)
    end

    test "delete_response/1 deletes the response" do
      response = response_fixture()
      assert {:ok, %Response{}} = Responses.delete_response(response)
      assert_raise Ecto.NoResultsError, fn -> Responses.get_response!(response.id) end
    end

    test "change_response/1 returns a response changeset" do
      response = response_fixture()
      assert %Ecto.Changeset{} = Responses.change_response(response)
    end
  end
end
