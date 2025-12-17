using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Gtech_Manager_Backend.Data;
using Gtech_Manager_Backend.Models;

namespace Gtech_Manager_Backend.Controllers
{
    [ApiController]
    [Route("api/clients")]
    public class ClientsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ClientsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Clientes.ToList());
        }

        [HttpPost]
        public IActionResult Post([FromBody] Cliente cliente)
        {
            _context.Clientes.Add(cliente);
            _context.SaveChanges();

            return CreatedAtAction(nameof(Get), new {id = cliente.Id}, cliente);
        }
    }
}
