defmodule EventsSpaWeb.ResponseView do
  use EventsSpaWeb, :view
  alias EventsSpaWeb.ResponseView

  def render("index.json", %{responses: responses}) do
    %{data: render_many(responses, ResponseView, "response.json")}
  end

  def render("show.json", %{response: response}) do
    %{data: render_one(response, ResponseView, "response.json")}
  end

  def render("response.json", %{response: response}) do
    %{id: response.id,
      choice: response.choice,
      user_id: response.user_id,
      }
  end
end
