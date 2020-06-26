defmodule TimeManagerWeb.Resolvers.Content do
  alias TimeManager.Calendar

  def list_events(_parent, params, _resolution) do
    {:ok, Calendar.list_events(params)}
  end

end