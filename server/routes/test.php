$query = $this->db->query('SELECT name, title, email FROM my_table');

foreach ($query->result() as $row)
{
    echo $row->title;
    echo $row->name;
    echo $row->email;
}

echo 'Total Results: ' . $query->num_rows();