namespace Gtech_Manager_Backend.Models;

public class Cliente
{    
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Nome { get; set; } = string.Empty;
    public string Telefone { get; set; } = string.Empty;
}
