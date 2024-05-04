import plotly.graph_objects as go

# Define the nodes and links of the Sankey diagram
nodes = [
    {'label': 'Confest First'},
    {'label': 'Wait'},
    {'label': 'Node A'},
    {'label': 'Node B'},
    {'label': 'Node C'},
    {'label': 'Accept'},
    {'label': 'Reject'}
]

links = [
    {'source': 0, 'target': 1, 'value': 20},
    {'source': 1, 'target': 2, 'value': 10},
    {'source': 2, 'target': 3, 'value': 5},
    {'source': 0, 'target': 3, 'value': 15},
    {'source': 0, 'target': 6, 'value': 5},
    {'source': 3, 'target': 4, 'value': 5},
    {'source': 4, 'target': 5, 'value': 5},
    {'source': 5, 'target': 6, 'value': 5}
]

# Create the Sankey diagram figure
fig = go.Figure(data=[go.Sankey(
    node=dict(
      pad=15,
      thickness=20,
      line=dict(color='black', width=0.5),
      label=[node['label'] for node in nodes],
      color='blue'
    ),
    link=dict(
      source=[link['source'] for link in links],
      target=[link['target'] for link in links],
      value=[link['value'] for link in links]
  ))])

# Customize the layout and display the figure
fig.update_layout(title_text="Sankey Diagram with Confest First and Wait")
fig.show()

