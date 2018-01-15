
# -*- coding: utf-8 -*-

# importer biopandas via commande
#   pip install biopandas
# marche sur le cremi


from biopandas.pdb import PandasPdb

# genere un objet panda dico a partir du pdb
ppdb = PandasPdb().read_pdb('1ag4.pdb')

#from IPython import get_ipython
#get_ipython().run_line_magic('matplotlib', 'inline')
import matplotlib.pyplot as plt
from matplotlib import style
style.use('ggplot')

# genere figure distribution des atoms
plt.figure(1)
ppdb.df['ATOM']['element_symbol'].value_counts().plot(kind='bar')
plt.title('Distribution of Atom Types')
plt.xlabel('elements')
plt.ylabel('count')
plt.savefig("distrib.png")

# generer figure repartition B factors ( mobilité des atoms )
plt.figure(2)
ppdb.df['ATOM']['b_factor'].plot(kind='line')
plt.title('B-Factors Along the Amino Acid Chain')
plt.xlabel('Residue Number')
plt.ylabel('B-factor in $A^2$')
plt.savefig("bfactor.png")
plt.show()




"""
# BESOIN DAVOIR LE MEME NOMBRE D ATOMES DANS LES 2 PDB A COMPARER
l_1 = PandasPdb().read_pdb('1ag4.pdb')
l_2 = PandasPdb().read_pdb('3a5p.pdb')

r = PandasPdb.rmsd(l_1.df['HETATM'], l_2.df['HETATM'],
                   s=None) # all atoms, including hydrogens
print('RMSD: %.4f Angstrom' % r)
"""
